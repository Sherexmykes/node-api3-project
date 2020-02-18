const express = require("express");
const postDb = require("./postDb");

const router = express.Router();
router.use("/:id", validatePostId);
//get posts
router.get("/", (req, res) => {
  postDb
    .get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving the posts" });
    });
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.post);
});
//delete posts
router.delete("/:id", (req, res) => {
  const { id } = req.post;
  postDb
    .remove(id)
    .then(post => {
      res.status(200).json({ message: `${post} post has been deleted` });
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting post" });
    });
});
//update posts
router.put("/:id", (req, res) => {
  const { id } = req.post;
  postDb
    .update(id, req.body)
    .then(post => {
      res.status(200).json(`${post} post has been updated`);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the post" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  postDb
    .getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "exception", err });
    });
}

module.exports = router;
