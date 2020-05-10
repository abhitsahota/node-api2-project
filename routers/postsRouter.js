// import packages
const express = require('express')

// import app modules
const DBMethods = require('../data/db')

const router = express.Router()

// GET /api/posts --------------------------------------------- //
router.get('/', (req, res) => {
    DBMethods.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

// POST /api/posts --------------------------------------------- //
router.post('/', (req, res) => {
    let post = req.body
    if ( post.title && post.contents ) {
        try {
            DBMethods.insert(post)
            res.status(201).json(post)
        }
        catch {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

// GET ID /api/posts/:id --------------------------------------------- //
router.get('/:id', (req, res) => {
    const { id } = req.params
    if ( id ) {
        DBMethods.findById(id)
        .then(post => res.status(200).json(post))
        .catch(e => res.status(500).json({ error: "The posts information could not be retrieved." }))
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})

// DELETE ID /api/posts/:id --------------------------------------------- //
router.delete('/:id', (req, res) => {
    const { id } = req.params
    if ( id ) {
        DBMethods.remove(id)
        .then(post => res.status(200).json(post))
        .catch(e => res.status(500).json({ error: "The posts information could not be retrieved." }))
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})

// PUT ID /api/posts/:id --------------------------------------------- //
router.put('/:id', (req, res) => {
    const { id } = req.params
    const postUpdate = req.body
    if ( postUpdate.title && postUpdate.contents ) {
        DBMethods.update(id, postUpdate)
        .then(post => res.status(200).json(post))
        .catch(e => res.status(500).json({ error: "The posts information could not be retrieved." }))
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})

// GET ID COMMENTS /api/posts/:id/comments --------------------------------------------- //
router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    if ( id ) {
        DBMethods.findPostComments(id)
        .then(post => res.status(200).json(post))
        .catch(e => res.status(500).json({ error: "The posts information could not be retrieved." }))
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    
})

// POST ID COMMENTS /api/posts/:id/comments --------------------------------------------- //
router.post('/:id/comments', (req, res) => {
    const { id } = req.params
    let newComment = req.body
    if ( id ) {
        if ( newComment.text ) {
            newComment = {...newComment, post_id: id}
            console.log(newComment)
            DBMethods.insertComment(newComment)
            .then(comments => {
                console.log('ping')
                console.log(DBMethods.insertComment(newComment))
                res.status(201).json(comments)})
            .catch(e => res.status(500).json({ error: "The posts information could not be retrieved." }))
        } else {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        }
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})


module.exports = router