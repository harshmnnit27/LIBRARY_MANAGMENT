import mongoose from "mongoose";
import dotenv from "dotenv";
import { Book } from "../models/bookModel.js";

dotenv.config();

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const books = [
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
        price: 15,
        quantity: 10,
        availability: true
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
        price: 18,
        quantity: 5,
        availability: true
      },
      {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        description: "Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it: us.",
        price: 22,
        quantity: 2,
        availability: true
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
        price: 12,
        quantity: 8,
        availability: true
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
        price: 10,
        quantity: 0,
        availability: false
      }
    ];

    await Book.deleteMany({});
    console.log("🧹 Cleared existing books.");

    await Book.insertMany(books);
    console.log("✅ 5 Sample Books seeded successfully.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding books:", error);
    process.exit(1);
  }
};

seedBooks();
