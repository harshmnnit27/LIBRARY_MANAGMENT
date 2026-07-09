import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { config } from "dotenv";

config({ path: "./.env" });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");

    console.log("Generating 50 mock books...");
    const books = [];
    for (let i = 1; i <= 50; i++) {
      books.push({
        title: `Mystery of the Hidden Library Vol. ${i}`,
        author: `Author ${i}`,
        price: Math.floor(Math.random() * 80) + 20, 
        quantity: Math.floor(Math.random() * 10) + 1, 
        availability: true,
        description: `A gripping mystery book ${i} generated for the library catalog.`,
        createdBy: "System"
      });
    }

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
