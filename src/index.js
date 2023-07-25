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

    // function getAvailableIndex(projectName){
    //     let project = projectDictionary[projectName]

    //     let count = 0;

    //     for (let _todo in project) {
    //         ++count;
    //     }
    //     return count
    //     // console.log(projectName, project, count)
    // }

    const getAvailableIndex = (projectName) => {
        let project = projectDictionary[projectName]

        let count = 0;

        for (let _todo in project) {
            ++count;
        }
        return count
        // console.log(projectName, project, count)
    }

    // function shiftIndexAfterDelete(projectName, deletedIndex){
    //     let project = projectDictionary[projectName]
    //     let lastIndex = getAvailableIndex(projectName)

    //     // if there's only one project, do nothing
    //     if (lastIndex == deletedIndex){
    //         return
    //     };

    //     // shift the indeces
    //     for (let i = deletedIndex; i<lastIndex; i++){
    //         let nextIndex = i+1;
    //         project[i] = project[nextIndex];

    //         // delete the last index which has been reassigned
    //         if (nextIndex == lastIndex){
    //             deleteTodo(projectName, lastIndex)  
    //         }
    //     } 
    // }

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

    // function deleteTodo(projectName, index){
    //     let project = projectDictionary[projectName]

    //     delete(project[index])
    //     shiftIndexAfterDelete(projectName, index)
    // }

    const deleteTodo = (projectName, index) => {
        let project = projectDictionary[projectName]

        delete(project[index])
        shiftIndexAfterDelete(projectName, index)
    }

    // function addTodo(projectName, description, dueDate, priority) {
    //     // get last index of todo
    //     let todo = new Todo(description, dueDate, priority)

    //     projectDictionary[projectName][getAvailableIndex(projectName)] = todo;
    // }

    const addTodo = (projectName, description, dueDate, priority) => {
        // get last index of todo
        let todo = new Todo(description, dueDate, priority)

        projectDictionary[projectName][getAvailableIndex(projectName)] = todo;
    };


    // function addProject(projectName){
    //     console.log(projectDictionary)
    //     projectDictionary[projectName] = {};
    //     console.log(projectDictionary)
    // }

    const addProject = (projectName) => {
        console.log(projectDictionary)
        projectDictionary[projectName] = {};
        console.log(projectDictionary)
    };

    // function deleteProject(projectName){
    //     delete(projectDictionary[projectName])
    // }

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

board.addProject("myfirstproject")
console.log(board.projectDictionary)
board.addTodo("myfirstproject", "a", "b", "c")
console.log(board.projectDictionary)
board.deleteTodo("myfirstproject", 0)
console.log(board.projectDictionary)

// addProject("huh?")

// addTodo("huh?","a","b","c")
// addTodo("huh?","a1","b1","c1")
// addTodo("huh?","a2","b2","c2")
// addTodo("huh?","a3","b3","c3")
// addTodo("huh?","a4","b4","c4")
// addTodo("huh?","a5","b5","c5")

// deleteProject("huh?")
// deleteProject("all")

// addProject("huh?")

// addTodo("huh?","a","b","c")
// addTodo("huh?","a1","b1","c1")
// addTodo("huh?","a2","b2","c2")
// addTodo("huh?","a3","b3","c3")
// addTodo("huh?","a4","b4","c4")
// addTodo("huh?","a5","b5","c5")

// deleteTodo("huh?", 4)

// addTodo("all","a","b","c")
// addTodo("all","a1","b1","c1")
// addTodo("all","a2","b2","c2")
// addTodo("all","a3","b3","c3")
// addTodo("all","a4","b4","c4")
// addTodo("all","a5","b5","c5")


// deleteTodo("all", 1)
// deleteTodo("all", 0)
// deleteTodo("all", 3)