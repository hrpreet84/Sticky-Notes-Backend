const express = require('express');
const config = require('config');
const router = express.Router();
const Note = require('../../models/Note');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.post('/',auth,async (req, res) => {
    try {
        const newNote = new Note({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            color: req.body.color

        });
        const Post1 = await newNote.save();
        res.send(Post1);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});
router.get('/', auth,async (req, res) => {
    try {
        const Post2 = await Note.find({ user: req.user.id });
        res.send(Post2);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id', auth,async (req, res) => {
    try {
        const Post3 = await Note.findOne({
          user: req.user.id,
          _id: req.params.id
        });
        if (!Post3) {
          return res.status(404).send('No post found');
        }
        res.send(Post3);
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
      }
});
router.put('/', auth, async (req, res) => {
    try {
      let Post4 = await Note.findOne({
        user: req.user.id,
        _id: req.body.id
      });
  
      if (!Post4) {
        return res.status(404).send('Post not found');
      }
  
      // Update
      const { id, title, description, category } = req.body;
      Post4 = await Note.findOneAndUpdate(
        { _id: id },
        { description: description, title: title, category: category }
      );

      res.send(Post4);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });
router.delete('/', auth,async (req, res) => {
    try {

        await Note.findOneAndRemove({ user: req.user.id, _id: req.body.id });
        res.json({ msg: 'Post deleted' });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

});
module.exports = router;