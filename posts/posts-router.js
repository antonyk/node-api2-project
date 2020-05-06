const router = require('express').Router();
const Posts = require('../data/db');

const examplePost = {
  title: "The post title", // String, required
  contents: "The post contents", // String, required
  created_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)",  // Date, defaults to current date",
  updated_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)",  // Date, defaults to current date",
}
const exampleComment = {
  text: "The text of the comment", // String, required
  post_id: "The id of the associated post", // Integer, required, must match the id of a post entry in the database
  created_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)",  // Date, defaults to current date
  updated_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)", // Date, defaults to current date
}

// ENDPOINTS
// 1. Create
router.post('/', (req, res) => {
  // create a new post using req body data
  if (!req.body || !req.body.title || !req.body.contents) res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

  Posts.insert(req.body)
    .then(ret => {
      Posts.findById(ret.id)
        .then(post => {
          res.status(201).json(post)
        })
        .catch(err => {
          res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

router.post ('/:id/comments', (req, res) => {
  // create a new comment for a post using the post id from params
  let id = 0;
  try {
    id = Number.parseInt(req.params.id)
  }
  catch {
    res.status(400).json({ errorMessage: "Invalid ID." })
  }

  if (!req.body || req.body.text) res.status(400).json({ errorMessage: "Please provide text for the comment." })

  Posts.findById(id)
    .then(post => {
      if (post.length === 0) res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    })

  // if we're here, ALL IS GOOD
  const post = {...req.body};
  post.post_id = id;
  Posts.insertComment(post)
    .then(pid => {
      Posts.findCommentById(pid.id)
        .then(com => {
          res.status(201).json(com)
        })
        .catch(err => {
          res.status(500).json({ error: "There was an error while retrieving saved comment." })
        })
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving comment to the database." })
    })
})

// 2. Retrieve
router.get('/', (req, res) => {

})
router.get('/:id', (req, res) => {

})
router.get('/:id/comments', (req, res) => {

})

// 3. Update
router.put('/:id', (req, res) => {

})

// 4. Delete
router.delete('/:id', (req, res) => {
  
})


module.exports = router;