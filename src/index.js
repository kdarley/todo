// data structure

// let fakeProject = {
//     "projectName": {
//         "taskIndex" : {"description" :"description 1",
//                         "dueDate": "dueDate1", 
//                         "priority": "priority1"}
//     } 
// }

const board = (() => {
    class Todo {
        constructor(description, dueDate, priority){
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
        }
    
        get description(){
            return this._description;
        }
    
        set description(value){
            if (value.length <= 0) {
                console.log("Description can't be empty");
                return;
            }
            this._description = value;
        }
    
        get duedate(){
            return this._dueDate;
        }
    
        set dueDate(value){
            this._dueDate = value; 
        }
    
        get priority(){
            return this.priority;
        }
    
        set priority(value){
            this._priority = value;
        }
    };

    let projectDictionary = {}

    const getAvailableIndex = (projectName) => {
        let project = projectDictionary[projectName]

        let count = 0;

        for (let _todo in project) {
            ++count;
        }
        return count
    }

    const shiftIndexAfterDelete = (projectName, deletedIndex) => {
        let project = projectDictionary[projectName]
        let lastIndex = getAvailableIndex(projectName)

        // if there's only one project, do nothing
        if (lastIndex == deletedIndex){
            return
        };

        // shift the indeces
        for (let i = deletedIndex; i<lastIndex; i++){
            let nextIndex = i+1;
            project[i] = project[nextIndex];

            // delete the last index which has been reassigned
            if (nextIndex == lastIndex){
                deleteTodo(projectName, lastIndex)  
            }
        } 
    }

    const deleteTodo = (projectName, index) => {
        let project = projectDictionary[projectName]

        delete(project[index])
        shiftIndexAfterDelete(projectName, index)
    }

    const addTodo = (projectName, description, dueDate, priority) => {
        // get last index of todo
        let todo = new Todo(description, dueDate, priority)

        projectDictionary[projectName][getAvailableIndex(projectName)] = todo;
    };

    const addProject = (projectName) => {
        console.log(projectDictionary)
        projectDictionary[projectName] = {};
        console.log(projectDictionary)
    };

    const deleteProject = (projectName) => {
        delete(projectDictionary[projectName])
    };

    return {
        addProject,
        deleteProject,
        addTodo,
        deleteTodo, 
        projectDictionary
    }
    
})();

board.addProject("Work")
board.addProject("Grocery")
board.addProject("Household")

function removeSidebarGroups(){
    let sidebarGroups = document.querySelectorAll("button.group-category")
    sidebarGroups.forEach(group => {
        group.remove();
    });
}

function displayGroups(){
    removeSidebarGroups();
    let groups = board.projectDictionary
    let addGroup = document.querySelector("button.add-group")
    let groupSidebarContainer = document.querySelector("div.groups")
    for (let group in groups){
        console.log(group)
        let sidebarGroup = document.createElement("button")
        sidebarGroup.classList.add("group-category")
        sidebarGroup.textContent = group

        groupSidebarContainer.insertBefore(sidebarGroup, addGroup)
    }
};

displayGroups();

function newGroupListener(){
    // dom objects
    const newGroupButton = document.querySelector("button.add-group")
    const overlay = document.querySelector("div.overlay")
    const newGroupPopup = document.querySelector("div.new-group-popup")
    const closeGroupFormButton = document.querySelector("button.group-form-close-button")
    const submitGroupFormButton = document.querySelector("button#group-submit-button")
    
    // sidebar + New Group click
    newGroupButton.addEventListener('click', () => {
        overlay.addEventListener('click', () => {
            overlay.style.display = "none"
            newGroupPopup.style.display = "none"
        })
        overlay.style.display = "flex"
        newGroupPopup.style.display = "flex"
    })
    
    // close popup form on X click
    closeGroupFormButton.addEventListener('click', () => {
        overlay.style.display = "none"
        newGroupPopup.style.display = "none"
    })

    // handle on submit button click
    submitGroupFormButton.addEventListener("click", submitGroupClick, false)
    // alternative behavior function
    function submitGroupClick(event){
        event.preventDefault();
        let groupName = document.getElementById("group-name").value

        overlay.style.display = "none"
        newGroupPopup.style.display = "none"

        board.addProject(groupName)

        document.getElementById("group-name").value = null

        displayGroups();
    }
}

newGroupListener()