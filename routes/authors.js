const express = require('express')
const author = require('../models/author')
const router = express.Router()

// all authors route
router.get('/', (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !=='') {
        searchOptions.name = new ReqExp(req.query.name, 'i')
    }
    try {
        const authors = await Authors.find({})
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/')
    }
})

// new authors route
router.get('/new', async (req, res) => {
    res.render('authors/new', { author: new author() })
})

// create authors route
router.post('/', async (req, res) => {
    const author = new author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect('authors/%{newAuthor.id}')
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

//     author.save((err, newAuthor) => {
//         if (err) {
//             res.render('authors/new', {
//                 author: author,
//                 errorMessage: 'Error creating Author'
//             })
//         } else {
//         //    res.redirect('authors/${newAuthors}')
//             res.redirect('authors')
//         }
//     })

module.exports = router