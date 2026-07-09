import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/granthamitra";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ["Admin", "User"] },
  accountVerified: { type: Boolean, default: true },
});
const User = mongoose.model("User", userSchema);

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});
const Book = mongoose.model("Book", bookSchema);

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to database (${MONGO_URI}) for seeding...`);

    // Create Admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.deleteMany({ email: "admin@granthamitra.com" });
    await User.create({
      name: "Gurukul Master",
      email: "admin@granthamitra.com",
      password: hashedPassword,
      phone: "1234567890",
      role: "Admin",
      accountVerified: true,
    });
    console.log("Created Admin User: admin@granthamitra.com / password: admin123");
    
    // Create Test User
    const userPassword = await bcrypt.hash("user123", 10);
    await User.deleteMany({ email: "user@granthamitra.com" });
    await User.create({
      name: "Vidyarthi",
      email: "user@granthamitra.com",
      password: userPassword,
      phone: "0987654321",
      role: "User",
      accountVerified: true,
    });
    console.log("Created Test User: user@granthamitra.com / password: user123");

    // Create Books
    await Book.deleteMany({});
    await Book.create([
      {
        title: "Bhagavad Gita As It Is",
        author: "A.C. Bhaktivedanta Swami Prabhupada",
        description: "The definitive English translation of the timeless ancient epic.",
        price: 50,
        quantity: 10,
        availability: true,
      },
      {
        title: "Patanjali Yoga Sutras",
        author: "Swami Vivekananda",
        description: "A profound study of the mind and deep meditation techniques.",
        price: 35,
        quantity: 5,
        availability: true,
      },
      {
        title: "Chanakya Neeti",
        author: "Chanakya",
        description: "Ancient Indian treatise on statecraft, economic policy and military strategy.",
        price: 25,
        quantity: 12,
        availability: true,
      },
      {
        title: "The Upanishads",
        author: "Eknath Easwaran",
        description: "Core spiritual teachings of ancient India.",
        price: 40,
        quantity: 8,
        availability: true,
      },
      {
        title: "Discovery of India",
        author: "Jawaharlal Nehru",
        description: "A broad view of Indian history, culture, and philosophy.",
        price: 60,
        quantity: 15,
        availability: true,
      },
      {
        title: "Autobiography of a Yogi",
        author: "Paramahansa Yogananda",
        description: "A beautifully written account of a life dedicated to spirituality.",
        price: 45,
        quantity: 20,
        availability: true,
      },
      {
        title: "Mahabharata",
        author: "C. Rajagopalachari",
        description: "A masterful retelling of the great Indian epic.",
        price: 30,
        quantity: 7,
        availability: true,
      },
      {
        title: "Ramayana",
        author: "Valmiki",
        description: "The classical epic of Prince Rama and his quest.",
        price: 35,
        quantity: 9,
        availability: true,
      },
      {
        title: "Arthashastra",
        author: "Kautilya",
        description: "An ancient Indian treatise on statecraft, economic policy and military strategy.",
        price: 55,
        quantity: 4,
        availability: true,
      },
      {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        description: "Explores the ways in which biology and history have defined us.",
        price: 40,
        quantity: 11,
        availability: true,
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        description: "An easy & proven way to build good habits & break bad ones.",
        price: 20,
        quantity: 18,
        availability: true,
      }
    ]);
    console.log("Seeded books successfully!");

    mongoose.disconnect();
    console.log("Done!");
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

seedData();
