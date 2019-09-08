var listElement = document.querySelector('#todo ul');
var inputElement = document.querySelector('#input input');
var buttonElement = document.querySelector('#input button');

/*Funcionamento da aplicação de ToDo*/

var todos = JSON.parse(localStorage.getItem('todos') || "[]");

function render() {
    listElement.innerHTML = '';

    for (const todo of todos) {
        var itemElement = document.createElement('li');
        var itemLabel = document.createElement('label');
        var itemText = document.createTextNode(todo);

        itemLabel.appendChild(itemText);

        var btnRemove = document.createElement('button');
        btnRemove.setAttribute('class', 'itemBtn');
        btnRemove.innerHTML = 'X';
        var pos = todos.indexOf(todo);

        itemElement.setAttribute('ondblclick', 'edit(' + pos + ')');
        btnRemove.setAttribute('onclick', 'remove(' + pos + ')');

        itemElement.appendChild(itemLabel);
        itemElement.appendChild(btnRemove);
        listElement.appendChild(itemElement);
    }
}

render();

function add() {
    var itemInput = inputElement.value;
    if (itemInput === "" || itemInput === " ") {
        inputElement.classList.add("warn");
        setTimeout(() => {
            inputElement.classList.remove("warn");
        }, 500);

    } else {
        todos.push(itemInput);
        inputElement.value = '';
        render();
        storage();
    }
    inputElement.focus();    
}

buttonElement.onclick = add;

function remove(pos) {
    todos.splice(pos, 1);
    render();
    storage();
}

function edit(pos) {    
    todos.splice(pos, 1, "b");
    render();
    storage();
}

function storage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

