
// /** custom validator return value
//  *  Returning true means the data is valid according to your custom rule.
//     Returning false means the data is not valid according to your custom rule.
//     Returning a Promise object allows you to perform more complex validation tasks.
//     Returning a rejected Promise means there's a problem with the validation.

//  */


import { body, CustomValidator } from "express-validator";
import UserService from "../services/userService";
import { comparePassword } from "../utils/password";
import { TUser } from "../models/userModel";
import { getGradYears, getPrograms } from "../utils/school";


const userLoginValidator = [
  body("email", "Email is required").isEmail().normalizeEmail(),
  body("password", "Password is required").trim().notEmpty()
];

const userSignupValidator = [
  body("email").custom(async (value: any) => {
    const [userExist] = await new UserService().getOne({ email: value });
    console.log("Exists? ", userExist);
    if (userExist) {
      console.log("The user already exists");
      return Promise.reject();
    }
  }).withMessage("Email is taken! If it belongs to you, please login!"),
  body("firstname", "First Name is required").trim().notEmpty().escape(),
  body("lastname", "Last Name is required").trim().notEmpty().escape(),
  body("email", "Email is required").isEmail().normalizeEmail(),
  body("password", "Password is required").trim().notEmpty(),
  body("password", "Password must be strong - must be at least 8 characters long and contain at least 1 uppercase letter and 1 symbol or number").isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1 }),
  body("matricNumber", "Matric Number is required").trim().notEmpty(),
  body("confirmPassword", "Please enter your password again").optional().trim().notEmpty(),
  body("confirmPassword").optional().custom((value, { req }) => {
    const { password } = req.body;
    const { currentPassword } = req.body;
    if (value !== currentPassword) {
      return false; // Password must be the same as Confirm password
    } else {
      return true;
    }
  }).withMessage("Passwords must be the same")
];

const userUpdateProfileValidator = [
  body("email").custom(async (value, { req }) => {
    const { id } = req.user;
    const [userExist] = await new UserService().getOne({ email: value, _id: { $ne: id } });
    console.log("Exists? ", userExist);
    if (userExist) {
      console.log("The user already exists");
      return Promise.reject();
    }
  }).withMessage("Another user with that email already exists."),
  body("firstname", "First Name is required").trim().notEmpty(),
  body("lastname", "Last Name is required").trim().notEmpty(),
  body("email", "Email is required").isEmail().normalizeEmail(),
  body("matricNumber", "Matric Number is required").trim().notEmpty(),
  body("graduationYear", "Please Select your Graduation Year").trim().notEmpty(),
  body("program", "Please Select your program").trim().notEmpty()
  // body("program", "Please Select your program").optional().trim().notEmpty()
];

const continueSignupValidator = [
  body("password", "Please enter your Password.").trim().notEmpty(),
  body("password", "Password must be strong - must be at least 8 characters long and contain at least 1 uppercase letter and 1 symbol or number").isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1 }),
  body("matricNumber", "Please Enter your correct matric Number").trim().notEmpty(),
  body("graduationYear", "Please Select your Graduation Year").notEmpty(),
  body('graduationYear', "Please Select your Graduation Year").custom((value, { req }) => {
    const graduationYears = getGradYears();   //To get our array of graduation years
    console.log("The graduation years from continueSignup validator ", graduationYears);
    if (!graduationYears.includes(value)) {
      throw new Error('No Graduation Year selected.');
    }
    return true;
  }),
  body("program", "Please Select your program").notEmpty(),
  body('program', "Please Select your Program").custom((value, { req }) => {
    const programs = getPrograms();   //To get our array of programs
    if (!programs.includes(value)) {
      throw new Error('No Program selected.');
    }
    return true;
  })
]

const userUpdatePasswordValidator = [
  body("currentPassword", "Please enter your current password").trim().notEmpty(),
  body("currentPassword").custom(async (value, { req }) => {
    const { id } = req.user;
    const [userExists, user] = await new UserService().getById(id) as [true, TUser, string, { status: number, metadata?: any }];   //type assertion
    // const [userExists, user] = await new UserService().getById(id);

    const isCorrectPassword = await comparePassword(value, user!.password);   //Using the not null assertion operator  (!.) indicating that the user object is not null

    if (!isCorrectPassword) {
      return Promise.reject();
    }
  }).withMessage("Current Password is incorrect"),
  body("newPassword", "Enter new Password.").trim().notEmpty(),
  body("newPassword", "New Password must be strong - must contain at least 1 uppercase letter and 1 symbol or number").isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1 }),
  body("newPassword").custom((value, { req }) => {
    const { currentPassword } = req.body;
    if (value === currentPassword) {
      return false; // New Password can not be the same as old password
    } else {
      return true;
    }
  }).withMessage("New Password can not be the same as old password"),
  body("confirmNewPassword", "Please confirm your new password").trim().notEmpty(),
  body("confirmNewPassword").custom((value, { req }) => {
    const { newPassword } = req.body;
    if (value === newPassword) {
      return true;
    } else {
      return false;
    }
  }).withMessage("Passwords must match!")
];

const userForgotPasswordValidator = [
  body("email", "Email is required").isEmail().normalizeEmail()
];

const userResetPasswordValidator = [
  body("token", "Token is required").trim().notEmpty(),
  body("newPassword", "New Password can not be empty").trim().notEmpty(),
  body("newPassword", "New Password must be strong - must contain at least 1 uppercase letter and 1 symbol or number").isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1 }),
  body("confirmNewPassword", "Please confirm your new password").trim().notEmpty(),
  body("confirmNewPassword").custom((value, { req }) => {
    const { newPassword } = req.body;
    if (value === newPassword) {
      return true;
    } else {
      return false;
    }
  }).withMessage("Passwords must match!")
];

export {
  userLoginValidator,
  userSignupValidator,
  continueSignupValidator,
  userUpdateProfileValidator,
  userUpdatePasswordValidator,
  userForgotPasswordValidator,
  userResetPasswordValidator
};
