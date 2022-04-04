//ERROR HANDLING
const { check, body, validationResult } = require("express-validator");


const userSignupValidator = () => {
  return [
    //First name and lastname is not null and is between 4-10 characters
    body("firstname", "First Name is required").trim().notEmpty().isLength({ min: 3 }),
    body("lastname", "Last Name is required").trim().notEmpty().isLength({ min: 3 }),
    //Email validation
    body("email", "Email is required").notEmpty(),
    body("email")
      .isEmail()
      .withMessage("Email must be valid containing @ and a domain (e.g .com) ")
      .isLength({ min: 10 }),
    //Password validation
    body("password", "Password is required").notEmpty(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long")
    //   .matches(/\d/)
    //   .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?><\$%\^&\*])/)
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)
      .withMessage("Password must be Capitalized and alphanumeric.(e.g. PaS$@WO123D)."),
    body("matricNumber", "Matric Number is required").notEmpty(),
  ];
};


const createProjectValidator = () => {
  return [
    //Name, abstract must not be empty
    body("name", "Project name is required").trim().notEmpty(),
    body("abstract", "Enter a description for your project").trim().notEmpty(),
    body("abstract", "Project description must contain atleast 50 words").isLength({ min: 50}),

    //Authors and tags 
    body("authors", "Enter Project Author(s) separated with a comma (,) ").trim().notEmpty(),
    // body("authors", "Author(s) name must be true and correct").matches(/[a-zA-Z][a-zA-Z][a-zA-Z]/).isLength({min: 5}),
    body("authors", "Author(s) name must be true and correct").matches(/[a-zA-Z][a-zA-Z][a-zA-Z]/),   //Name must contain atleast 3 characters... Could make the validation to be at least 6 because of fullname
    // body("authors", "Enter Project Author(s) rightly. No whitespaces or incorrect characters allowed!").custom(value => value.trim().length !== 0).matches(/[a-zA-Z]/),
    body("tags","Enter Project tag(s) separated with a #").trim().notEmpty().matches(/[a-zA-Z][a-zA-Z]/)    //Taga must contain atleast 2 letters

  ]
}


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  // errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  errors.array().map((err) => extractedErrors.push( err.msg ));


  return res.status(400).json({
    errors: extractedErrors,
  });

 
};

module.exports = {
  userSignupValidator,
  validate,
  createProjectValidator
};
