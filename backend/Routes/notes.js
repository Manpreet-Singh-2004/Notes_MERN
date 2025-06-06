const express = require('express')
const {
        getNotes,
        getSingleNote,
        CreatingNote,
        deleteNote,
        updateNote
} = require('../controllers/notesControllers')

const router = express.Router()

router.get('/', getNotes)

router.get('/:id', getSingleNote)

router.post('/', CreatingNote)

router.delete('/:id', deleteNote)

router.patch('/:id', updateNote)

module.exports = router