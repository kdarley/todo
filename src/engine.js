// data structure

// let fakeProject = {
//     "projectName": {
//         "taskIndex" : {"description" :"description 1",
//                         "dueDate": "dueDate1", 
//                         "priority": "priority1"}
//     } 
// }

const createBoard = (() => {
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

    const resetIndeces = (projectName) => {
        let project = projectDictionary[projectName]

        let start = 0

        for (let todo in project){
            project[start] = project[todo]
            start++
        }

        delete(project[start++])
    }

    const deleteTodo = (projectName, index) => {
        let project = projectDictionary[projectName]

        delete(project[index])
        // shiftIndexAfterDelete(projectName, index)
        resetIndeces(projectName);
    }

    const addTodo = (projectName, description, dueDate, priority) => {
        // get last index of todo
        let todo = new Todo(description, dueDate, priority)

        projectDictionary[projectName][getAvailableIndex(projectName)] = todo;
    };

    const addProject = (projectName) => {
        projectDictionary[projectName] = {};
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

const board = createBoard;

export {board}