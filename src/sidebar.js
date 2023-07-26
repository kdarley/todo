import { board } from './engine.js';
import { removeDisplayedTodos, displayTodos } from './todo.js';

let activeGroup = "Work";

function removeSidebarGroups(){
    let sidebarGroups = document.querySelectorAll("button.group-category")
    sidebarGroups.forEach(group => {
        group.remove();
    });
}

function displayGroups(){
    removeSidebarGroups();
    let groups = board.projectDictionary
    let addGroup = document.querySelector("button.add-group") // we use this as a target to insert before
    let groupSidebarContainer = document.querySelector("div.groups")
    for (let group in groups){
        let sidebarGroup = document.createElement("button")
        sidebarGroup.classList.add("group-category")
        sidebarGroup.classList.add("unique_"+group)
        sidebarGroup.textContent = group
        sidebarGroup.addEventListener('click', () => {
            removeDisplayedTodos(),
            displayTodos(group),
            activeGroup = group,
            removeActiveGroups(),
            sidebarGroup.classList.add("active-group");

        })
        

        groupSidebarContainer.insertBefore(sidebarGroup, addGroup)
    }
};

function removeActiveGroups(){
    // remove current active group
    let groups = document.querySelectorAll("button.group-category")
    groups.forEach(group => {
        group.classList.remove("active-group")
    })
}

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

        // check if the groupname exists
        const groups = document.querySelectorAll("button.group-category")

        let cont = true
        groups.forEach(group => {
            if (group.classList.contains("unique_"+groupName)){
                alert("choose a unique group name")
                cont = false
            }
        })

        if (cont = true){
            board.addProject(groupName) 
        }

        document.getElementById("group-name").value = null

        displayGroups();
    }
}

export {displayGroups, newGroupListener, activeGroup}