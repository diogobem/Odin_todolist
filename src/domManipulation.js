import * as taskJS from './tasks.js'
import * as modalInput from './inputModal.js'
import * as projectJS from './project.js'
import getWeekNumber from '../dist/getDate.js';

const sendModalButtons = document.querySelectorAll('[data-send-button]');

// define the behavior of the Send button inside each modal (Tasks and Projects)
sendModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        let inputValues;
        const modal = button.closest('.modal')
        const modaldb = modal.dataset.db
        inputValues = modalInput.valuesInputModal(modal);
        if (inputValues.id != '') {
            if (modaldb == 'Projects') {
                projectJS.editProject(inputValues)
            } else {
                taskJS.editTask(inputValues)
                const line = document.querySelector(`#id-${inputValues.id}`).parentElement
                changeTaskLine(line, inputValues)

            }
        } else {
            if (modaldb == 'Projects') {
                projectJS.createProject(inputValues)
            } else {
                taskJS.createTask(inputValues)
            }
        }

        modalInput.closeModal(modal)
    })
})


//add eventlistener to date buttons:

const allTasks = document.querySelector('#allTasksButton')
const dueToday = document.querySelector('#todayTaskButton')
const dueThisWeek = document.querySelector('#weekTaskButton')

allTasks.addEventListener('click', () => {
    filterTasksDate('all')
})
dueToday.addEventListener('click', () => {
    filterTasksDate('today')
})
dueThisWeek.addEventListener('click', () => {
    filterTasksDate('thisWeek')
})

//add projects to the view (Create Elements)
export function addProjectToView(object) {
    const ul = document.querySelector('#projetos')
    const ahref = document.createElement('a')
    ahref.id = object.id;
    ahref.textContent = object.projectName
    ahref.classList.add('nav-link')
    ahref.addEventListener('click', () => {
        filterTasks(object.projectName)
    })
    const li = document.createElement('li')

    li.append(ahref)
    ul.append(li);

}

// add tasks to the View (create elements)
export function addTaskToView(object, tasks) {
    const tbody = document.querySelector('#taskstbody')
    const tr = document.createElement('tr')
    const taskID = document.createElement('td')
    const checkbox = document.createElement('td')
    const taskDescription = document.createElement('td')
    const project = document.createElement('td')
    const taskName = document.createElement('td')
    const taskDueDate = document.createElement('td')
    const actions = document.createElement('td')
    const priority = document.createElement('td')
    taskID.textContent = object.id
    taskID.hidden = true
    taskID.classList.add('taskId')
    taskID.id = `id-${object.id}`
    tr.append(taskID);
    checkbox.innerHTML = `<input type="checkbox" id='checkbox-${object.id}'>`

    if (object.taskStatus == 'yes') {

        let check = checkbox.querySelector(`input`)
        check.checked = 'true';
        tr.classList.add('complete')
    }
    tr.append(checkbox)
    taskName.classList.add('taskName')
    taskName.textContent = object.taskName
    tr.append(taskName);
    project.classList.add('taskProject')
    project.textContent = object.taskProject
    tr.append(project);
    taskDescription.textContent = object.taskDescription
    taskDescription.classList.add('taskDescription')
    tr.append(taskDescription);
    taskDueDate.textContent = object.taskDueDate
    taskDueDate.classList.add('taskDueDate')
    tr.append(taskDueDate);
    priority.textContent = object.taskPriority
    priority.classList.add('taskPriority')
    tr.append(priority);
    actions.innerHTML = "<div class='btn-group'><button type='button' class='editTask'><i class='fa fa-pencil'></i><button class='deleteTask' ><i class='fa fa-trash-o'></i></div>"
    tr.append(actions);
    tbody.append(tr);
    checkbox.addEventListener('change', taskJS.changeTaskStatus)
    actions.querySelector('.editTask').addEventListener('click', taskJS.queryEditTask)
    actions.querySelector('.deleteTask').addEventListener('click', taskJS.deleteTask)
}

// filter tasks based on projects selected
export function filterTasks(project) {
    const tbody = document.querySelector("#taskstbody")
    const table = document.querySelector("#taskTable")
    let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

    tbody.remove();
    const newTbody = document.createElement('tbody')
    newTbody.id = 'taskstbody'
    table.append(newTbody)

    const filteredTasks = tasks.filter((obj) => {
        if (obj.taskProject == project) return obj
    })

    filteredTasks.forEach(addTaskToView)

}

// filter tasks based on due dates
export function filterTasksDate(project) {
  
    const tbody = document.querySelector("#taskstbody")
    const table = document.querySelector("#taskTable")
    let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    let filteredTasks = []
    const today = new Date()
    const thisWeek = getWeekNumber(today)
    let re = /(\d{4})-(\d{2})-(\d{2})/
    tbody.remove();
    const newTbody = document.createElement('tbody')
    newTbody.id = 'taskstbody'
    table.append(newTbody)
    const timezoneoffset = -120;

    if (project == 'today') {
        filteredTasks = tasks.filter((obj) => {
            const objectDate= new Date(obj.taskDueDate).toISOString().split('T')[0]
            const todayFormat=new Date(today).toISOString().split('T')[0]
            if (objectDate == todayFormat) return obj
        })
    } else if (project == 'thisWeek') {
        filteredTasks = tasks.filter((obj) => {
            let dateWeekObj = getWeekNumber(new Date(obj.taskDueDate))
            let dateWeekToday = getWeekNumber(today)
             if ((dateWeekObj[0]+'-'+dateWeekObj[1]) == (dateWeekToday[0]+'-'+dateWeekToday[1])) return obj
        })
    } else {
        filteredTasks= tasks
    }

    filteredTasks.forEach(addTaskToView)


}

//Change task line shown in table
function changeTaskLine(line, inputValues) {

    const taskName = line.querySelector('.taskName')
    const taskProject = line.querySelector('.taskProject')
    const taskDescription = line.querySelector('.taskDescription')
    const taskDueDate = line.querySelector('.taskDueDate')
    const taskPriority = line.querySelector('.taskPriority')
    taskName.textContent = inputValues.taskName
    taskProject.textContent = inputValues.taskProject
    taskDescription.textContent = inputValues.taskDescription
    taskDueDate.textContent = inputValues.taskDueDate
    taskPriority.textContent = inputValues.taskPriority

}