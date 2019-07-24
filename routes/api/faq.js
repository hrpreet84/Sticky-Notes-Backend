const express = require('express');
const config = require('config');
const router = express.Router();
const Faq = require('../../models/Faq');
const auth = require('../../middleware/auth');

router.post('/',auth,async (req, res) => {
    try {
        const newTask = new Faq({
            question: req.body.question,
            answer: req.body.answer
        });
        const Task2 = await newTask.save();
        res.send(Task2);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});
router.get('/',async (req, res) => {
    try {
        const Task2 = await Faq.find();
        //const Task2 = await Faq.find();
        console.log('sent');
        res.send(Task2);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id',async (req, res) => {
    try {
        const Tasks3 = await Faq.findOne({
          _id: req.params.id
        });
        if (!Tasks3) {
          return res.status(404).send('No Faq found');
        }
        res.send(Tasks3);
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
      }
});
router.put('/', auth, async (req, res) => {
    try {
      let Tasks4 = await Faq.findOne({
        user: req.id,
        _id: req.body.id
      });
  
      if (!Tasks4) {
        return res.status(404).send('Task not found');
      }
  
      // Update
      const { answer,question } = req.body;
      Tasks4 = await Faq.findOneAndUpdate(
        { _id: id },
        { answer: answer, question: question}
      );

      res.send(Tasks4);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });
router.delete('/', auth,async (req, res) => {
    try {

        await Faq.findOneAndRemove({ _id: req.body.id });
        res.json({ msg: 'Faq deleted' });

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