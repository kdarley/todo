import './styles.css'

import { board } from './engine.js'
import { displayGroups, newGroupListener} from './sidebar.js'
import { displayTodos, newTodoListener } from './todo.js'

board.addProject("Work")
board.addProject("Grocery")
board.addProject("Household")
board.addTodo("Work", "Complete todo project", "2023-07-26", "high")
board.addTodo("Work", "Send email to dad", "2023-07-26", "low")
board.addTodo("Work", "Complete capstone", "2023-07-26", "medium")

displayTodos("Work");

displayGroups();

newGroupListener();
newTodoListener();