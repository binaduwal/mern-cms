const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const User = require("../models/userModel");
dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/sysqube');

    const existing = await User.findOne({ email: "superadmin@example.com" });

    if (existing) {
      console.log("Superadmin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("superadmin123", 10);

    const superAdmin = new User({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    });

    await superAdmin.save();
    console.log("Superadmin seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding superadmin:", error);
    process.exit(1);
  }
};

seed();
