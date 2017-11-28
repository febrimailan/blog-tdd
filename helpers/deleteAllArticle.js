const Article = require('../models/Article');

const deleteAllArticle = () => {
  Article
    .deleteMany({})
    .then(() => {
      console.log('Cleared!!');
    });
}

module.exports = deleteAllArticle;
