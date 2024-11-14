const tasksContainer = document.querySelector('.app__tasks--list')
const addTaskBtn = document.querySelector('.app__btn_add')
const divInputEmpty = document.querySelector('.app__tasks')
const inputTask = document.querySelector('.app__input')
//LOCAL STORAGE LOAD
const loadTask = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    storedTasks.forEach(task => {
        addTask(task.text, task.isChecked)
    })
}

//LOCAL STORAGE SAVE
const saveTask = () =>{
    const tasks = []
    document.querySelectorAll('.app__tasks--list li').forEach(taskItem => {
        tasks.push({
            text: taskItem.firstChild.textContent,
            isChecked: taskItem.classList.contains('checked')
        })
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
 
//APP
const addTask = (taskText = null, isChecked = false) => {
    let createDiv = document.createElement('div')
    let createTask = document.createElement('li')
    let newTask = taskText || inputTask.value
    let existingError = document.querySelector('.emptyInput')
    //REMOVING ERROR 
    if (existingError){
        existingError.remove()
    }
    //CREATING THE ERROR HANDLER
    if (newTask === ''){
        createDiv.className = 'emptyInput'
        createDiv.textContent= 'Insert a task name'
        divInputEmpty.insertBefore(createDiv,tasksContainer)
    }
    //CREATING THE TASK
    else {
        //Creating The Task
        createTask.className = 'taskCreated'
        createTask.textContent = newTask
        //Apply 'checked' class if isChecked is true
        if (isChecked){
            createTask.classList.add('checked')
        }
        //Creating the delete
        let deleteSpan = document.createElement('span')
        deleteSpan.textContent = 'x'

        //Appending the containers
        createTask.appendChild(deleteSpan)
        tasksContainer.appendChild(createTask)

        document.querySelector('.app__input').value = ''
    }
    saveTask()
}

//Event Handler
addTaskBtn.addEventListener('click',()=>{
    addTask()
})
inputTask.addEventListener('keydown',(event) => {
    if (event.key === 'Enter') {
        addTask()
    }
})

//Check Task
tasksContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI'){
        event.target.classList.toggle('checked')
        saveTask()
    }  
})
//Remove Task
tasksContainer.addEventListener('click',(event)=>{
    if (event.target.tagName === 'SPAN'){
        event.target.parentElement.remove()
        saveTask()
    }
})

window.addEventListener('load',loadTask)