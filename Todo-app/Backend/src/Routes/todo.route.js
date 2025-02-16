import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../Controllers/todo.controller.js";

const router = express.Router()


router.post('/add',createTodo)
router.get('/',getTodos)
router.delete('/:id',deleteTodo)
router.put('/:id',updateTodo)



export default router