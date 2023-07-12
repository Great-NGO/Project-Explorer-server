// const toSentenceCase = (str:string) : string => str.charAt(0).toUpperCase() + str.substring(1);

// /**
//  * Translates a Mongoose ValidatorError or MongoDB DuplicateKeyError into a human readable string.
//  *
//  * Example usage :
//  *
//  *  import helper from 'mongo_helper';
//  *  try {
//  *   const doc = new Model({...})
//  *   return await doc.save()
//  *  } catch (error) {
//  *    // converts the error object to an array of error messages.
//  *    return helper.translateError(error)
//  *  }
//  * @param {*} err
//  */
// export const translateError = (err: any) : string[] => {
//   const errors = [];
//   if (!err.code && !err.errors) {
//     errors.push(err.message);
//   } else if (err.code === 11000) {
//     const field = Object.keys(err.keyPattern)[0];
//     errors.push(toSentenceCase(`${field} already exists.`));
//   } else {
//     Object.keys(err.errors).map((field) => {
//       let msg = err.errors[field].message;
//       errors.push(toSentenceCase(msg.replace("Path ", "").replace(/`/g, "")));
//     });
//   }
//   return errors;
// };

export const toSentenceCase = (str:string) => str.charAt(0).toUpperCase() + str.substring(1);

export type TranslateErrorResponse = [
  success: boolean,
  data: null,
  message: string,
  metadata: {
    status: number,
    errors: any
  }
]

/**
 * Translates a MongoDB error ( whether Mongoose ValidatorError or MongoDB DuplicateKeyError) or a non-database error into a human readable string and returns a formatted error response.
 *
 * @param {Error|MongoError} err - The error object to be translated.
 * @param {string} passedInMessage - The custom message to include in the error response.
 * @returns {Array} - A formatted error response in the format [success, data, message, metadata].
 * 
 * @example 
 * //Handling a MongoDB duplicate key error
 * const err = new MongoError("E11000 duplicate key error");
 * const response = translateError(err, "Saving user");
 * //response : [false, null, "Username already exists.", { status: 400, errors: ["Username already exists."]}]
 * 
 * //Handling a non-database error
 * const err = new Error("Something went wrong");
 * const response = translateError(err, "Performing an operation");
 * //response : [false, null, "Something went wrong in Performing an operation", { status: 500, errors: ["Something went wrong"]}]
 */
export const translateError = (err:any, passedInMessage:string): TranslateErrorResponse => {
  const errors = [];
  let response:TranslateErrorResponse;   //Variable to store the returned response

  // If the error is a non-database error or a generic error
  if (!err.code && !err.errors) {
    const errorMessage = err.message || "Unknown error";
    const errorType = err.name || "Unknown error";
    const status = 500;
    const error = toSentenceCase(errorMessage);

    // Push the error message to the errors array
    errors.push(error);
    // Assign the value of response
    response = [false, null, `Something went wrong in ${passedInMessage}`, { status, errors }];
  }
  // Error handling for MongoDB duplicate key error (unique values)
  else if (err.code === 11000) {

    const field = Object.keys(err.keyPattern)[0];
    errors.push(toSentenceCase(`${field} already exists.`));
    // Assign to the value of response
    response = [false, null, errors[0], { status: 400, errors }];
  }
  // Error handling for other MongoDB errors
  else {
    if (err.errors) {   //Mostly for validation errors
      Object.keys(err.errors).map((field) => {
        let msg = err.errors[field].message;
        errors.push(toSentenceCase(msg.replace("Path ", "").replace(/`/g, "")));
      });
    } else {
      errors.push(toSentenceCase(err.message));
    }

    // Assign to the value of response
    response = [false, null, errors[0], { status: 400, errors }];
  }
  return response;
};
