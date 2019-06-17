const express = require("express");
const postRepository = require("../repository/postRepository");

const router = express.Router();

// Render the home page and list all blog posts
router.get("/", (req, res) => {
  postRepository.getAll()
    .then(posts => {
      return res.render("index", { posts: posts });
    })
});

// // Render the user dashboard
router.get("/dashboard", (req, res, next) => {
  postRepository.getByAuthorName('Chris Belyeu')
    .then(posts => {
      return res.render("dashboard", {
        posts: posts
      })
    })
});

// // Create a new post
router.post("/dashboard", (req, res, next) => {
  postRepository.saveNewPost(req.body)
  .then(post => {
    return res.render("dashboard", {
      post: post
    });
  });
});

// // Render the edit post page
router.get("/:slug/edit", (req, res, next) => {
  postRepository.getOne(req.params.slug)
  .then(post => {
    return res.render("edit", {
      post: post
    });
  });
});

// Update a post
router.post("/:slug/edit", (req, res, next) => {
  return postRepository.update({
    ...req.body,
    slug: req.params.slug
  })
  .then(post => {
    return res.redirect("/dashboard");
  });
});

// // Delete a post
router.post("/:slug/delete", (req, res, next) => {
  postRepository.deletePost(req.params.slug)
  .then(result => {
    return res.render("dashboard", {});
  })
});

// View a post
router.get("/:slug", (req, res, next) => {
  postRepository.getOne(req.params.slug)
  .then(post => {
    return res.render("post", {
      post: post
    });
  });
});

module.exports = router;
