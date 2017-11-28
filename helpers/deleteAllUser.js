const User = require('../models/User');

const deleteAllUser = () => {
  User
    .deleteMany({})
    .then(() => {
      console.log('Cleared!');
    });
};

module.exports = deleteAllUser;
