import cron from "node-cron";
import { User } from "../models/userModel.js";

export const removeUnverifiedAccounts = () => {
  cron.schedule("*/5 * * * * *", async () => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

      const result = await User.deleteMany({
        accountVerified: false,
        createdAt: { $lt: thirtyMinutesAgo },
      });

      console.log(`Deleted ${result.deletedCount} unverified accounts.`);
    } catch (error) {
      console.error("Error while removing unverified accounts:", error);
    }
  });
};
