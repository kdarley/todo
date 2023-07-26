import './styles.css'

import { board } from './engine.js'
import { displayGroups, newGroupListener} from './sidebar.js'
import { displayTodos, newTodoListener } from './todo.js'

board.addProject("Work")
board.addProject("Grocery")
board.addProject("Household")
board.addTodo("Work", "Complete todo project", "today", "high")

displayTodos("Work");

displayGroups();

newGroupListener();
newTodoListener();