import Todo from "../Models/todo.model.js"

export const createTodo = async (req, res) => {
    const { title } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ message: "Please enter the field" });
        }

        const createTodo = new Todo({ title });

        await createTodo.save(); // ✅ Save the new todo

        res.status(201).json({
            _id: createTodo._id,
            title: createTodo.title,
            completed: createTodo.completed,
        });

    } catch (error) {
        console.log("Error in addTodo controller:", error);
        res.status(500).json({ message: "Internal server error" }); // ✅ Use 500 for server errors
    }
};


export const getTodos=async(req,res)=>{
    try {
        const todos = await Todo.find().sort({ createdAt: -1 }); // Fetch and sort by newest first
        res.status(200).json(todos);
    } catch (error) {
        console.log("Error fetching todos:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteTodo=async(req,res)=>{
   const {id} = req.params
   try {
    if (!id) {
        return res.status(401).json({message : "Todo not exits"})
    }

    const delTodo = await Todo.findByIdAndDelete(id)
    if (delTodo) {
        return res.status(200).json({message : "Deleted Successfully"})
    }else{
        return res.status(200).json({message : "Todo not found"})
    }


   } catch (error) {
        console.log("error in delete controller",error);
        return res.status(500).json({ message: "Internal server error" });
   } 
}

export const updateTodo=async(req,res)=>{
    const {id} = req.params
    const{title} = req.body
    try {
        if (!id) {
            return res.status(401).json({message : "Todo not exits"})
        }
    
        const updateTodo = await Todo.findByIdAndUpdate(id,{title,completed : true},{new : true})
        if (updateTodo) {
            return res.status(200).json({message : "Updated Successfully"})
        }else{
            return res.status(200).json({message : "Todo not found"})
        }
    } catch (error) {
        console.log("error in update controller",error);
        return res.status(500).json({ message: "Internal server error" });
   } 
}