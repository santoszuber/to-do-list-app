"use strict"
let taskName;
const tasksContainer = document.getElementById("tasks");
const submitBtn = document.getElementById("submit-btn");


class TaskElement {
    constructor() {
        this.create = function () {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            tasksContainer.appendChild(taskDiv);

            //Done button
            const doneBtn = document.createElement("button");
            doneBtn.innerHTML = `<ion-icon class="done-icon" name="checkmark-circle"></ion-icon>`
            doneBtn.classList.add("btn");
            taskDiv.appendChild(doneBtn);
            doneBtn.onclick = function () {
                tasksContainer.removeChild(taskDiv);
            }

            //Input
            const taskInput = document.createElement("input");
            taskInput.setAttribute("type", "text");
            taskInput.setAttribute("value", `${taskName}`);
            taskInput.setAttribute("maxlength", "22");
            taskInput.setAttribute("readonly", "");
            taskInput.classList.add("task-input");
            taskDiv.appendChild(taskInput);

            //Edit button
            const editBtn = document.createElement("button");
            let editMode = false;
            editBtn.classList.add("btn");
            editBtn.innerHTML = `<ion-icon class="edit-icon" name="create"></ion-icon>`
            taskDiv.appendChild(editBtn);
            editBtn.onclick = function () {
                if (!editMode) {
                    editMode = true;
                    taskInput.removeAttribute("readonly");
                    taskInput.classList.add("edit-mode");
                } else {
                    if (taskInput.value.length > 3 && !taskInput.value.includes("<", ">")) {
                        editMode = false;
                        taskInput.setAttribute("readonly", "");
                        taskInput.classList.remove("edit-mode");
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Please insert more than 3 characters and avoid using "<" or ">" symbols',
                            icon: 'warning',
                            confirmButtonText: 'Ok'
                        });
                    }
                }
            }

        }
    }
}


submitBtn.onclick = function () {
    taskName = document.getElementById("task-name-input").value;
    if (taskName.length > 3 && !taskName.includes("<", ">")) {
        const task = new TaskElement(taskName);
        task.create();
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Please insert more than 3 characters and avoid using "<" or ">" symbols',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
    }
    document.getElementById("task-name-input").value = "";
    return false;
}