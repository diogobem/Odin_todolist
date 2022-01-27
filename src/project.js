import uid from './idGenerator.js'
import {addProjectToView} from './domManipulation.js'

export default  class Project {
    constructor(projectName) {
        this.id = uid();
        this.projectName = projectName;
    }
     
}

export function createProject(array, modal){
    let object={}
        object = new Project(array['projectName'])
        projects.push(object)
        let taskProject=document.querySelector('[data-id=taskProject]')
        taskProject.innerHTML+=`<option>${array['projectName']}</option>`
        localStorage.setItem("projects", JSON.stringify(projects));
        addProjectToView(object)
   return object
}

export function editProject (object) {
    console.log(object)
}