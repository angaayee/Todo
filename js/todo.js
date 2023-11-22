var todo = [];
var itemId = [];
var todos= document.getElementById("todos");
var icons = "<span class = 'icons'>"+
                "<i class = 'fa fa-edit' onclick = 'editTodo(event)'></i>"+
                "<i class = 'fa fa-trash' onclick = 'deleteTodo(event)' ></i>"+
"</span>";

function getRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
    }
    itemId.push(randomText);
    return randomText;
}



function markComplete(event){
    if(event.target.classList[0] !== "fa" && event.target.parentElement.tagName !== "FORM"){
        if(event.target.style.textDecoration === ""|| event.target.style.textDecoration === "none" ){
            event.target.style.textDecoration = "line-through";
            event.target.style.backgroundColor = "green";
        }
        else{
            event.target.style.textDecoration = "none";
            event.target.style.backgroundColor = "#03045e";
        }
    }
    
}

function onSubmit(event) {
    event.preventDefault();
    var inputElement = document.getElementsByTagName("input")[0];
    var inputVal = inputElement.value.trim();
    if (inputVal === "") {
        return;
    } 
    else {
        todo.push(inputVal);
        var createPara = document.createElement("p");
        createPara.className = "each-todo";
        createPara.setAttribute('itemId',getRandomText(10)); 
        createPara.addEventListener("click", function(event) {
            markComplete(event);
        })
        createPara.innerText = inputVal;
        createPara.innerHTML += icons;
        todos.appendChild(createPara);
        inputElement.value = "";
    }
}


function deleteTodo(event){
    event.target.parentElement.parentElement.remove();
}
 
var updateBtn = document.createElement("input");
updateBtn.type = "submit";
updateBtn.value = "Update Todo";
updateBtn.addEventListener("click", function(event) {
    event.preventDefault();
    updateTodo(event);
});

function editTodo(event) {
    var todoElement = event.target.parentElement.parentElement;
    todoElement.className = 'each-todo-update';

    var updateElement = document.createElement('input');
    updateElement.type = 'text';
    updateElement.value = todoElement.innerText;

    var createForm = document.createElement('form');
    createForm.appendChild(updateElement);
    createForm.appendChild(updateBtn);

    todoElement.innerHTML = '';
    todoElement.appendChild(createForm);
}


function updateTodo(event){
  var eachUpdate = document.getElementsByClassName("each-todo-update");
  for(var i = 0 ; i < eachUpdate.length;i++){
        if(eachUpdate[i].getAttribute("itemid") === event.target.parentElement.parentElement.getAttribute("itemId")){
            if(event.target.previousSibling.value.trim() ===""){
                return;
            }
            eachUpdate[i].innerText = event.target.previousSibling.value;
            eachUpdate[i].innerHTML += icons;
            eachUpdate[i].className = "each-todo";
        }
  }
}