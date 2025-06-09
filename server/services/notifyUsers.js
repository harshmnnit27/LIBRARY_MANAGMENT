import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { User } from "../models/userModel.js";

export const notifyUsers = () => {
  cron.schedule("*/30 * * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: { $lte: oneDayAgo },
        returnDate: null,
        notified: false,
      });

      for (const element of borrowers) {
  if (element.user && element.user.email) {
    
    
    sendEmail({
      email: element.user.email,
      subject: "Book Return Reminder",
      message: `Hello ${element.user.name},\n\nThis is a reminder that the book you borrowed is due for return,Plsz return Book as soon as possible.`,
    });
    element.notified = true;
    await element.save();
    console.log(`Email sent to ${element.user.email}`)
  }
}

    } catch (error) {
      console.error("Some error occured while notifying users.",error);
    }
  });
};

