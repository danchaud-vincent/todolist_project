// variables
let myTodoList = []

// html elements
const ulEl = document.getElementById("ul-el")
const addBtn = document.getElementById("add-btn")
const inputTaskEl = document.getElementById("input-task-el")

// localStorage 
const myListFromStorage = localStorage.getItem("myTodoList")

if (myListFromStorage){

    // add the localstorage list to the todolist var
    myTodoList = JSON.parse(myListFromStorage)

    // render
    render(myTodoList)
}

//functions
addBtn.addEventListener("click", function(){

    // get value from the input
    const taskValue = inputTaskEl.value
    
    if (taskValue !== ""){

        // add the task to the todo list
        myTodoList.push({id: myTodoList.length,value: taskValue, checked: false})

        // add to the localStorage
        localStorage.setItem("myTodoList",JSON.stringify(myTodoList))

        //render
        render(myTodoList)

        // clear the input value
        inputTaskEl.value = ""
    }

})


function deleteTask(id){

    // get the id number of the button (string) and convert it to number
    const idNumber = Number(id[id.length-1])
    
    // delete the task from the list at the idNumber (is the index of the task)
    myTodoList.splice(idNumber, 1)

    // set the localStorage
    localStorage.setItem("myTodoList", JSON.stringify(myTodoList))

    //render
    render(myTodoList)
}

function checkTask(id){

    // get the id number of the button (string) and convert it to number
    const idNumber = Number(id[id.length-1])

    // get the elem in the document
    let checkboxEl = document.getElementById(id)
    let labelTaskEl = document.getElementById(`label-${id}`)

    if (checkboxEl.checked === true){

        // change the value of the todolist
        myTodoList[idNumber].checked = true
    }
    else{
        // change the value of the todolist
        myTodoList[idNumber].checked = false
    }

    // set the localStorage
    localStorage.setItem("myTodoList", JSON.stringify(myTodoList))

    // render
    render(myTodoList)
}


function render(arr){
    
    // init 
    let inputDOM = ""

    // loop through the list
    for (let i=0; i<arr.length; i++){

        if (arr[i].checked === true){
            inputDOM += `<li>
                        <input type="checkbox" id="task${i}" name="task${i}" onclick="checkTask(this.id)" checked/>
                        <label for="task${i}" id="label-task${i}" class="checked">${arr[i].value}</label>
                        <img class="li-closed" id="delete-el${i}" src="sources/delete.png" onclick="deleteTask(this.id)">
                    </li>`
        }
        else{
            inputDOM += `<li>
                        <input type="checkbox" id="task${i}" name="task${i}" onclick="checkTask(this.id)"/>
                        <label for="task${i}" id="label-task${i}">${arr[i].value}</label>
                        <img class="li-closed" id="delete-el${i}" src="sources/delete.png" onclick="deleteTask(this.id)">
                    </li>`
        }
        
    }

    // render in html
    ulEl.innerHTML = inputDOM
}