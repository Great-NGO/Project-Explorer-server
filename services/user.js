const User = require("../models/user");
const { translateError } = require("../models/mongo_helper");

/* Return user with specified id */
const getUserById = async (id) => {

    try {
  
      const user = await User.findById(id)
      return user
  
    } catch (error) {
      console.log(translateError(error));
      console.log(error)
    //   return translateError(error);
    }
  
  };

  module.exports = {
      getUserById
  }