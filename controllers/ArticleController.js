const slug = require('slug');
const Article = require('../models/Article');

const ArticleController = {
  fetchAll: (req, res) => {
    Article.find({})
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
  },
  fetchBySlug: (req, res) => {
    Article
      .findOne({slug: req.params.slug})
      .then((article) => {
        if (!article)
          res.status(404).json({});
        else {
          res.status(200).json(article)
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  create: (req, res) => {
    const articleSlug = slug(req.body.title || '', { lower: true })
    Article.create({
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      slug: articleSlug,
      featured_image: req.body.featured_image,
      author: req.body.author
    })
      .then((article) => {
        res.status(201).json(article);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  update: (req, res) => {
    Article
      .findOne({slug: req.params.slug})
      .then((article) => {
        if (!article) {
          res.status(404).json({});
        } else {
          const articleSlug = slug(req.body.title || '', {lower: true});
          Article
            .updateOne(
              { slug: req.params.slug },
              {
                title: req.body.title,
                content: req.body.content,
                excerpt: req.body.excerpt,
                slug: articleSlug,
                featured_image: req.body.featured_image,
                author: req.body.author
              },
              { runValidators: true }
            )
            .then((status) => {
              res.status(200).json(article);
            })
            .catch((err) => {
              res.status(400).json(err);
            })
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  delete: (req, res) => {
    Article
      .findOne({ slug: req.body.slug })
      .then((article) => {
        if (!article) {
          res.status(404).json({});
        } else {
          Article
            .deleteOne({ slug: req.params.slug })
            .then((status) => {
              res.status(200).json(err);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports = ArticleController;
