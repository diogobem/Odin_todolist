import uid from './idGenerator.js'
import * as modalInput from './inputModal.js'
import {addTaskToView} from './domManipulation.js'

//retrieve from "SERVER"


export default class Task {
    constructor(taskName, taskDescription, taskProject, taskDueDate, taskPriority, taskStatus) {
        this.id = uid();
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskProject = taskProject;
        this.taskDueDate = taskDueDate;
        this.taskPriority = taskPriority;
        this.taskStatus = taskStatus;
    }
     
      getDateFormatted() {
        const day = this.taskDueDate.split('/')[0]
        const month = this.taskDueDate.split('/')[1]
        const year = this.taskDueDate.split('/')[2]
        return `${day}/${month}/${year}`
      }
}

export function createTask(array){
    let tasks = JSON.parse(localStorage.getItem("tasks"))??[];
    let object={}    
      object = new Task(array['taskName'],array['taskDescription'],array['taskProject'],array['taskDueDate'],array['taskPriority'], 'no') 
      tasks.push(object)
      localStorage.setItem("tasks", JSON.stringify(tasks));
      addTaskToView(object)
 return object
}

export function changeTaskStatus (){
    let tasks = JSON.parse(localStorage.getItem("tasks"))??[];
    const tr=this.parentElement
    const id= tr.firstChild.textContent
    let array=[]
    tr.classList.toggle('complete')
    if (tr.classList.contains('complete')){
         tasks.map(object=>{
            if (object.id==id){
                object.taskStatus='yes'
            }
        })
    }
    else{
         tasks.map(object=>{
            if (object.id==id){
                object.taskStatus='no'
            }
        })
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function queryEditTask() {
    const tasks1 = JSON.parse(localStorage.getItem("tasks"))??[];
    const tr = this.closest('tr')
    const id_tr = tr.firstChild.textContent
    const modal = document.querySelector("#new_task")
    const object = tasks1.filter(obj=>{
        return obj.id==id_tr;
    })
 
    modalInput.loadValuesInputsModal(modal,object)
    modalInput.openModal(modal)
}

export function deleteTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks"))??[];
    const confirmation = confirm("Delete the Task?")
    if (confirmation==true){
        const tr = this.closest('tr')
        const id=tr.firstChild.textContent
        var index = tasks.map(obj => {
            return obj.id;
          }).indexOf(id);
          
          tasks.splice(index, 1);
          tr.remove()
        
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function editTask (array) {
let tasks = JSON.parse(localStorage.getItem("tasks"))??[];
let object = tasks.filter((obj)=>obj.id==array.id)


object[0].taskName=array.taskName
object[0].taskProject=array.taskProject
object[0].taskDescription=array.taskDescription
object[0].taskDueDate=array.taskDueDate
object[0].taskPriority=array.taskPriority


let newTasks = tasks.map(task=>{
    if(task.id==object[0].id){
        return object[0]

    }
    return task
})

localStorage.setItem("tasks", JSON.stringify(tasks));
}

