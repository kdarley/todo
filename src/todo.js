import { board } from './engine.js'
import { activeGroup } from './sidebar.js'

import deleteImageSVG from './images/delete.svg'
import editImageSVG from './images/edit.svg'

function newTodoListener(){
    const newTodoButton = document.querySelector('button.add-todo')
    const overlay = document.querySelector("div.overlay")
    const newTodoPopup = document.querySelector("div.new-todo-popup")
    const closeTodoFormButton = document.querySelector("button.todo-form-close-button")
    const submitTodoFormButton = document.querySelector("button#todo-submit-button")

    newTodoButton.addEventListener('click', () => {
        overlay.addEventListener('click', () => {
            overlay.style.display = "none"
            newTodoPopup.style.display = "none"
        })
        overlay.style.display = "flex"
        newTodoPopup.style.display = "flex"
    })

    // close popup form on X click
    closeTodoFormButton.addEventListener('click', () => {
        overlay.style.display = "none"
        newTodoPopup.style.display = "none"
    })

    // handle on submit button click
    submitTodoFormButton.addEventListener("click", submitTodoClick, false)
    // alternative behavior function
    function submitTodoClick(event){
        event.preventDefault();
        let todoName = document.getElementById("todo-name").value
        let dueDate = document.getElementById("due-date").value
        let priority = document.getElementById("priority").value

        overlay.style.display = "none"
        newTodoPopup.style.display = "none"

        board.addTodo(activeGroup, todoName, dueDate, priority)

        document.getElementById("todo-name").value = null
        document.getElementById("due-date").value = null

        displayTodos(activeGroup);
    }
}

function removeDisplayedTodos(){
    let todos = document.querySelectorAll("li.todo")
    todos.forEach(todo => {
        todo.remove();
    });
};

function strikeThroughOnCheckbox(todoObject){
    if (todoObject.classList.contains("strike")){
        todoObject.classList.remove("strike")
    } else {
        todoObject.classList.add("strike")
    }
}

function editTodoListener(buttonObject, description, dueDate, priority, todo){
    const overlay = document.querySelector("div.overlay")
    const editTodoPopup = document.querySelector("div.edit-todo-popup")
    const closeEditTodoFormButton = document.querySelector("button.edit-todo-form-close-button")
    const submitEditTodoFormButton = document.querySelector("button#edit-todo-submit-button")

    const formTodoName = document.getElementById("edit-todo-name")
    const formDueDate = document.getElementById("edit-due-date")
    const formPriority = document.getElementById("edit-form-priority")

    formTodoName.value = description
    formDueDate.value = dueDate
    formPriority.value=priority

    buttonObject.addEventListener('click', () => {
        overlay.addEventListener('click', () => {
            overlay.style.display="none"
            editTodoPopup.style.display="none"
        })
        overlay.style.display = "flex"
        editTodoPopup.style.display = "flex"
    })

    // close popup form on X click
    closeEditTodoFormButton.addEventListener('click', () => {
        overlay.style.display = "none"
        editTodoPopup.style.display = "none"
    })

    submitEditTodoFormButton.addEventListener("click", submitTodoClick, false)

    function submitTodoClick(event){
        event.preventDefault();

        board.projectDictionary[activeGroup][todo]["_description"] = formTodoName.value
        board.projectDictionary[activeGroup][todo]["_dueDate"] = formDueDate.value
        board.projectDictionary[activeGroup][todo]["_priority"] = formPriority.value

        overlay.style.display = "none"
        editTodoPopup.style.display = "none"

        displayTodos(activeGroup);
    }


}

function displayTodos(group){
    removeDisplayedTodos();
    let projectContainer = document.querySelector("ul.todo-container")
    let project = board.projectDictionary[group]

    for (let todo in project){
        let description = project[todo]["_description"]
        let dueDate = project[todo]["_dueDate"]
        let priority = project[todo]["_priority"]

        let todoItem = document.createElement("li")
        todoItem.classList.add("todo")
        todoItem.classList.add(todo)
        todoItem.classList.add(group)
        todoItem.classList.add(priority)
        let todoLeft = document.createElement("div")
        todoLeft.classList.add("todo-left")
        let todoPriority = document.createElement("div")
        todoPriority.classList.add("new-todo-priority")
        todoPriority.classList.add(priority)
        let todoCheckBox = document.createElement("button")
        todoCheckBox.classList.add("todo-checkbox")
        todoCheckBox.classList.add(todo)
        todoCheckBox.classList.add(group)
        todoCheckBox.addEventListener('click', () => {
            strikeThroughOnCheckbox(todoItem);
        })
        let todoDescription = document.createElement("div")
        todoDescription.classList.add("todo-description")
        todoDescription.textContent = description

        todoLeft.appendChild(todoPriority)
        todoLeft.appendChild(todoCheckBox)
        todoLeft.appendChild(todoDescription)

        todoItem.appendChild(todoLeft)

        let todoRight = document.createElement("div")
        todoRight.classList.add("todo-right")
        let todoDate = document.createElement("div")
        todoDate.classList.add("due-date")
        todoDate.textContent = dueDate
        let todoEdit = document.createElement("button")
        todoEdit.classList.add("edit-button")
        todoEdit.classList.add()
        todoEdit.addEventListener('click', () => {
            editTodoListener(todoEdit, description, dueDate, priority, todo);
        })
        let todoEditImage = document.createElement("img")
        todoEditImage.classList.add("todo-button")
        todoEditImage.classList.add("edit")
        todoEditImage.setAttribute("src", editImageSVG)

        let todoDelete = document.createElement("button")
        todoDelete.classList.add("delete-button")
        todoDelete.addEventListener('click', () => {
            board.deleteTodo(group, todo),
            displayTodos(group);

        })
        let todoDeleteImage = document.createElement("img")
        todoDeleteImage.classList.add("todo-button")
        todoDeleteImage.classList.add("delete")
        todoDeleteImage.setAttribute("src", deleteImageSVG)

        todoDelete.appendChild(todoDeleteImage)
        todoEdit.appendChild(todoEditImage)
        todoRight.appendChild(todoDate)
        todoRight.appendChild(todoEdit)
        todoRight.appendChild(todoDelete)

        todoItem.appendChild(todoRight)

        projectContainer.appendChild(todoItem)
    }
}

export {displayTodos, newTodoListener, removeDisplayedTodos}