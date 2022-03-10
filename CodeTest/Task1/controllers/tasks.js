const Task = require('../models/Task')
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async (req, res) => { //post
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task }) //whatever we are getting from the postman and then let's pass 
        //that object into Task.create //schema is on the models/Task and Task.create is on the 
        //controllers/tasks and then these instances of models are saved to the database. 

    } catch (error) {
      res.status(500).json({ msg: error }) // general server error
    }
   
}

const getTask = async (req, res) => {
    try {
      const {id:taskID} = req.params
      const task = await Task.findOne({_id:taskID });
    if(!task){
        return res.status(404).json({msg:`no task with id  ${taskID}`})
    }  

      res.status(200).json( { task } )
    }
      catch (error) {
        res.status(500).json({ msg: error })
    }
}


const deleteTask = async (req, res) => {
    try {
     const {id:taskID} = req.params;
     const task = await Task.findOneAndDelete({_id:taskID});
     if(!task){
        return res.status(404).json({msg:`no task with id  ${taskID}`})
    } 
   res.status(200).json( {task} )
   //res.status(200).send()
  // res.status(200).json({ task: null, status: 'success' })

    }
    catch (error) {
    res.status(500).json({ msg:error })
    }
    res.send('deleting task')
}


const updateTask =  async (req, res) => {
    try {
    const {id:taskID} = req.params; //destructuring from req.params
    
    const task = await Task.findByIdAndUpdate({_id:taskID}, req.body, {
        new:true,runValidators: true
    })
    
    if(!task){
        return res.status(404).json({msg:`no task with id  ${taskID}`})
    } 
    
    res.status(200).json({ task })
    }

    catch (error) {
        res.status(500).json({ msg:error })
    }
}



module.exports = {
    getAllTasks,
    createTask, 
    getTask, 
    updateTask, 
    deleteTask,
}