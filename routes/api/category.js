const express = require('express');
const config = require('config');
const router = express.Router();
const Category = require('../../models/Category');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.post('/',auth,async (req, res) => {
    try {
        const newTask = new Category({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });
        const Task2 = await newTask.save();
        res.send(Task2);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});
router.get('/', auth,async (req, res) => {
    try {
        const Task2 = await Category.find({ user: req.user.id });
        res.send(Task2);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id', auth,async (req, res) => {
    try {
        const Tasks3 = await Category.findOne({
          user: req.user.id,
          _id: req.params.id
        });
        if (!Tasks3) {
          return res.status(404).send('No task found');
        }
        res.send(Tasks3);
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
      }
});
router.put('/', auth, async (req, res) => {
    try {
      let Tasks4 = await Category.findOne({
        user: req.user.id,
        _id: req.body.id
      });
  
      if (!Tasks4) {
        return res.status(404).send('Task not found');
      }
  
      // Update
      const { id, title, description, status } = req.body;
      Tasks4 = await Category.findOneAndUpdate(
        { _id: id },
        { description: description, title: title, status: status }
      );

      res.send(Tasks4);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });
router.delete('/', auth,async (req, res) => {
    try {

        await Category.findOneAndRemove({ user: req.user.id, _id: req.body.id });
        res.json({ msg: 'Task deleted' });

        // var id = req.body.id;

        // Task.deleteOne({ _id: id }, function (err) {
        //     if (err) {
        //         console.log(err.message);
        //     }
        //     res.status(200).send("deleted");
        // });

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }

});
// router.put('/', auth,async (req, res) => {
//     try {
//         const id = req.body.id;
//         const chk = await Task.findByIdAndUpdate(id, {
//             $set: {
//                 title: req.body.title,
//                 description: req.body.description,
//                 status: req.body.status
//             }
//         });
//         if (chk != null) {
//             const tasks_list = await Task.find();
//             res.send(tasks_list);
//         }
//         else {
//             console.log("Task {" + id + "} not found");
//             res.status(500).send("Task {" + id + "} not found");
//         }

//     }
//     catch (err) {
//         console.log(err.message);
//         res.status(500).send("server error");
//     }

// });
module.exports = router;