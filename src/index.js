import * as domManipulation from './domManipulation.js'

//declaring variables and initializing

let projects=JSON.parse(localStorage.getItem("projects"))??[];
let tasks = JSON.parse(localStorage.getItem("tasks"))??[];

function loadInitTasks (tasks){
    if(tasks==null) return
    tasks.forEach(domManipulation.addTaskToView)
}

function loadInitProjects (projects){
    if(projects==null) return
    projects.forEach((project)=>{
 
        domManipulation.addProjectToView(project);
        let taskProject=document.querySelector('[data-id=taskProject]')
        taskProject.innerHTML+=`<option>${project['projectName']}</option>`
        localStorage.setItem("projects", JSON.stringify(projects));
    })
}

loadInitProjects(projects)
loadInitTasks (tasks)







