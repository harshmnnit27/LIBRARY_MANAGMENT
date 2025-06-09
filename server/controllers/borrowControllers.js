import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/calculateFine.js"; // ✅ New import

export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
  const { borrowedBooks } = req.user;

  res.status(200).json({
    success: true,
    borrowedBooks,
  });
});

export const recordBorrowedBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;

  const book = await Book.findById(id);
  if (!book) return next(new ErrorHandler("Book not found.", 404));

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("User not found.", 404));

  if (book.quantity === 0) {
    return next(new ErrorHandler("Book not available.", 400));
  }

  const alreadyBorrowed = user.borrowedBooks?.find(
    (b) => b.bookId.toString() === id && b.returned === false
  );
  if (alreadyBorrowed) {
    return next(new ErrorHandler("Book already borrowed.", 400));
  }

  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();

  const today = new Date();
  const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  user.borrowedBooks.push({
    bookId: book._id,
    bookTitle: book.title,
    borrowedDate: today,
    dueDate: oneWeekLater,
    returned: false,
  });
  await user.save();

  await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    book: book._id,
    price: book.price,
    borrowDate: today,
    dueDate: oneWeekLater,
  });

  res.status(201).json({
    success: true,
    message: "Borrowed book recorded successfully.",
  });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(async (req, res, next) => {
  const borrowedBooks = await Borrow.find();

  res.status(200).json({
    success: true,
    borrowedBooks,
  });
});

export const returnBorrowBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { email } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler("Book not found.", 404));
  }

  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const borrowedBook = user.borrowedBooks.find(
    (b) => b.bookId.toString() === bookId && b.returned === false
  );

  if (!borrowedBook) {
    return next(new ErrorHandler("Book was not borrowed or already returned.", 400));
  }

  borrowedBook.returned = true;
  borrowedBook.returnedDate = new Date();
  await user.save();

  book.quantity += 1;
  book.availability = book.quantity > 0;
  await book.save();

  const borrow = await Borrow.findOne({
    book: bookId,
    "user.email": email,
    returnDate: null,
  });

  let fine = 0;
  if (borrow) {
    borrow.returnDate = new Date();
    fine = calculateFine(borrow.dueDate);
    borrow.fine = fine;
    await borrow.save();
  }

  res.status(200).json({
    success: true,
    message: fine > 0
      ? `Book returned successfully. A fine of ₹${fine} has been applied.`
      : "Book returned successfully.",
  });
});
