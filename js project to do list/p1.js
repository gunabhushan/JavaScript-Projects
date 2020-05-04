const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadEventListeners();
function loadEventListeners(){
    // to get tasks from LS to task list 
    document.addEventListener('DOMContentLoaded', getTasks);
    // to add tasks using input field to task list
    form.addEventListener('submit',addTask);
    // to remove task from task list
    taskList.addEventListener('click',removeTask);
    // to clear all tasks
    clearbtn.addEventListener('click',clearTasks);
    // to filter tasks
    filter.addEventListener('keyup',filterTask);
}

function getTasks(e){
    let tasks = localStorage.getItem('tasks');
    let task;
    if(tasks === null){
        task = [];
    }
    else{
        task = JSON.parse(tasks);
    }

    task.forEach(function(item){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(item));
        const link  = document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
    e.preventDefault()
}



function setTasksToLocalStorage(input){
    let tasks = localStorage.getItem('tasks');
    let task;
    if(tasks === null){
        task = [];
    }
    else{
        task = JSON.parse(tasks);
    }

    task.push(input);

    localStorage.setItem('tasks', JSON.stringify(task));   
    
}



function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
    }
    else{
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link  = document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        setTasksToLocalStorage(taskInput.value);

        taskInput.value='';
    }    
    

    e.preventDefault();
}
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTasksFromLocalStorage(item){
    let tasks = localStorage.getItem('tasks');
    let task;
    if(tasks === null){
        task = [];
    }
    else{
        task = JSON.parse(tasks);
    }
    task.forEach(function(taskItem,index){
        if(item.textContent === taskItem){
            task.splice(index,1);
        }
    })
    localStorage.setItem("tasks",JSON.stringify(task));
}

function clearTasks(){
    while(taskList.firstChild){
        taskList.firstChild.remove();
    }
    localStorage.clear('tasks');
}
function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        
        
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}