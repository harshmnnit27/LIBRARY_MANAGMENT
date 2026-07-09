import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";
import { config } from "dotenv";

config({ path: "./.env" });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "library_management_system"
    });
    console.log("Database connected successfully");

    console.log("Fetching 100 books from OpenLibrary API...");
    // Fetch 100 highly rated science fiction books
    const res = await fetch("https://openlibrary.org/subjects/science_fiction.json?limit=100");
    const data = await res.json();
    const works = data.works;

    const books = works.map(work => ({
      title: work.title,
      author: work.authors && work.authors.length > 0 ? work.authors[0].name : "Unknown Author",
      price: Math.floor(Math.random() * 80) + 20, // Random price between $20 and $100
      quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
      availability: true,
      description: "A classic and fascinating science fiction book fetched from the OpenLibrary archive.",
      createdBy: "System"
    }));

    console.log(`Prepared ${books.length} books. Inserting into the database...`);
    await Book.insertMany(books);
    
    console.log("Books seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
