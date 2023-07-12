// /** custom validator return value
//  *  Returning true means the data is valid according to your custom rule.
//     Returning false means the data is not valid according to your custom rule.
//     Returning a Promise object allows you to perform more complex validation tasks.
//     Returning a rejected Promise means there's a problem with the validation.

//  */


import { body, cookie } from "express-validator";

const createProjectValidator = [
    //Name, abstract must not be empty
    body("name", "Project name is required").trim().notEmpty(),
    body("abstract", "Enter a description for your project").trim().notEmpty(),
    body("abstract", "Project description must contain atleast 50 words").isLength({ min: 50 }),

    //Authors and tags 
    body("authors", "Enter Project Author(s) separated with a comma (,) ").trim().notEmpty(),
    // body("authors", "Author(s) name must be true and correct").matches(/[a-zA-Z][a-zA-Z][a-zA-Z]/).isLength({min: 5}),
    body("authors", "Author(s) name must be true and correct").matches(/[a-zA-Z][a-zA-Z][a-zA-Z]/),   //Name must contain atleast 3 characters... Could make the validation to be at least 6 because of fullname
    // body("authors", "Enter Project Author(s) rightly. No whitespaces or incorrect characters allowed!").custom(value => value.trim().length !== 0).matches(/[a-zA-Z]/),
    body("tags", "Enter Project tag(s) separated with a #").trim().notEmpty().matches(/[a-zA-Z][a-zA-Z]/)    //Taga must contain atleast 2 letters
];

const updateProjectValidator = [
    body("projectId", "Project ID is required").trim().notEmpty(),
    body("name", "Project name is required").trim().notEmpty(),
    body("abstract", "Enter a description for your project").trim().notEmpty(),
    body("abstract", "Project description must contain atleast 50 words").isLength({ min: 50 }),
    //Authors and tags 
    body("authors", "Enter Project Author(s) separated with a comma (,) ").trim().notEmpty(),
    // body("authors", "Author(s) name must be true and correct").matches(/[a-zA-Z][a-zA-Z][a-zA-Z]/).isLength({min: 5}),
    body("authors", "Author(s) name must be true and correct").matches(/[a-zA-Z][a-zA-Z][a-zA-Z]/),   //Name must contain atleast 3 characters... Could make the validation to be at least 6 because of fullname
    // body("authors", "Enter Project Author(s) rightly. No whitespaces or incorrect characters allowed!").custom(value => value.trim().length !== 0).matches(/[a-zA-Z]/),
    body("tags", "Enter Project tag(s) separated with a #").trim().notEmpty().matches(/[a-zA-Z][a-zA-Z]/)    //Taga must contain atleast 2 letters
];

const deleteProjectValidator = [
    body("projectId", "Project ID is required").trim().notEmpty(),
    // cookie("authToken", "User must be logged in. (Auth Token not found)")
]




export {
    createProjectValidator,
    updateProjectValidator,
    deleteProjectValidator
};
