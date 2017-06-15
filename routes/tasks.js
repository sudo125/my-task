var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('myTaskList', ['tasks']);

//get all tasks
router.get('/tasks', function(req, res, next){
   console.log('get all task is working');
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//get one tasks
router.get('/tasks/:id', function(req, res, next){
   console.log('get one task is working');
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
    

//save task
router.post('/task', function(req, res, next){
    console.log('save is working');
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task)
        });
    }
})


//delete task
router.delete('/deltask/:id', function(req, res, next){
   console.log('delete is working');
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});



module.exports = router;