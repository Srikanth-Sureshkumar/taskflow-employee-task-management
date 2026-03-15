import bcrypt from "bcryptjs";
import User from "../models/User.js";

// UPDATE PROFILE
export const updateProfile = async (req, res) => {

  try {

    const { firstName, lastName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName },
      { new: true }
    );

    res.json({
      message: "Profile updated",
      user
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};



// CHANGE PASSWORD
export const changePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const match = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Current password incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password changed successfully"
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};



// DELETE ACCOUNT
export const deleteAccount = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.user.id);

    res.json({
      message: "Account deleted"
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};