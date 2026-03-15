// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";


// // REGISTER
// export const register = async (req, res) => {

//   try {

//     const { firstName, lastName, email, password, role } = req.body;

//     const userExist = await User.findOne({ email });

//     if (userExist) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       role
//     });

//     await user.save();

//     res.status(201).json({
//       message: "User Registered Successfully"
//     });

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }

// };


// // LOGIN
// export const login = async (req, res) => {

//   try {

//     const { email, password, role } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid Email" });
//     }

//     if (user.role !== role) {
//       return res.status(403).json({ message: "Role mismatch" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user
//     });

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }

// };


import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";


// REGISTER
export const register = async (req, res) => {

  try {

    const { firstName, lastName, email, password, role } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};



// LOGIN
export const login = async (req, res) => {

  try {

    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: "Role mismatch" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // SAFE RESPONSE
    res.json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};