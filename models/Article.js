require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connection.openUri(process.env.MONGO_URL);

const slug = require('slug');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required']
  },
  featured_image: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  }
});

//Middleware
ArticleSchema.pre('save', function(next) {
  mongoose.model('Article', ArticleSchema)
    .find({ slug: { $regex: '.*' + this.slug + '.*'}})
    .then((articles) => {
      if (articles.length)
        this.slug += '-' + articles.length.toString()
        next();
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = mongoose.model('Article', ArticleSchema);
