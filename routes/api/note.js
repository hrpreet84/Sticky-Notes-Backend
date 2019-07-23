const express = require('express');
const config = require('config');
const router = express.Router();
const Note = require('../../models/Note');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.post('/',
// [
//   check("text","Text is required").not().isEmpty()
// ],
auth,async (req, res) => {
    try {
        const newNote = new Note({
            user: req.id,
            title: req.body.title,
            text: req.body.text,
            id: req.body.id,
            grid:{
              i: req.body.grid.i,
              x: req.body.grid.x,
              y: req.body.grid.y,
              w: req.body.grid.w,
              h : req.body.grid.h,
              isDraggable: req.body.grid.isDraggable
            },

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
        const Post2 = await Note.find({ user: req.id });
        res.send(Post2);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id', auth,async (req, res) => {
    try {
        const Post3 = await Note.findOne({
          user: req.id,
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
router.post('/update', auth, async (req, res) => {
    try {
      let Post4 = await Note.findOne({
        user: req.id,
        id: req.body.id
      });
      console.log(Post4);
      if (!Post4) {
        try {
          const newNote = new Note({
              user: req.id,
              title: req.body.title,
              text: req.body.text,
              id: req.body.id,
              grid:{
                i: req.body.grid.i,
                x: req.body.grid.x,
                y: req.body.grid.y,
                w: req.body.grid.w,
                h : req.body.grid.h,
                isDraggable: req.body.grid.isDraggable
              },
  
              category: req.body.category,
              color: req.body.color
  
          });
          const Post1 = await newNote.save();
          res.send(Post1);
  
      } catch (error) {
          console.log(error.message);
          res.status(500).send('Server error');
      }
      }
  
      // Update
      //const { id, title, description, category } = req.body;
      else{
      const {id,title,text,grid,category} = req.body;
      Post4 = await Note.findOneAndUpdate(
        {id:id},
        {title: title,text: text,grid:grid, category:category}
            //color: req.body.color
      );
      }
      res.send(Post4);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });
router.post('/delete',auth,async (req, res) => {
    try {

        await Note.findOneAndRemove({ user: req.id, id: req.body.id });
        res.json({ msg: 'Post deleted' });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("server error");//
    }

});
module.exports = router;

// {user: req.id},
//             {title: req.body.title},
//             {text: req.body.text},
//             {id: req.body.id},
//             {grid:{
//               i: req.body.grid.i,
//               x: req.body.grid.x,
//               y: req.body.grid.y,
//               w: req.body.grid.w,
//               h : req.body.grid.h,
//               isDraggable: req.body.grid.isDraggable
//             }},

//             {category: req.body.category}