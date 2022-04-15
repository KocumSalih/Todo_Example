var todoList = [];

class TodoItem {
    constructor(isComplate, todoText) {
        this.isComplate = isComplate;
        this.todoText = todoText;

        this.listItem = document.createElement("li");
        this.checkInput = document.createElement("input");
        this.ListItemSpan = document.createElement("span");
    }

    getHtml = () => {
        if (this.isComplate)
            this.listItem.className = "todo-complete";
        else {
            this.listItem.className = "";
        }
        this.checkInput.type = "checkbox";
        this.listItem.appendChild(this.checkInput);

        this.checkInput.onchange = () => {
            this.isComplate = this.checkInput.checked;
            refreshList();
        }

        this.ListItemSpan.innerHTML = this.todoText;
        this.listItem.appendChild(this.ListItemSpan);

        return this.listItem;
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    var todoInput = document.getElementById("txtTodo");
    var addButton = document.getElementById("btnAdd");
    var deleteButton = document.getElementById("btnDelete");

    addButton.onclick = function () {
        var todo = new TodoItem(false, todoInput.value);

        todoList.push(todo);
        refreshList();
    }

    deleteButton.onclick = function () {
        var newTodoList = [];
        for (var i = 0; i < todoList.length; i++) {
            if (!todoList[i].isComplate) {
                newTodoList.push(todoList[i]);
            }
        };
        todoList = newTodoList;
        refreshList();
    }
});

function refreshList() {
    var todoUL = document.getElementById("todoUL");
    var complateUL = document.getElementById("complateUL");

    todoUL.innerHTML = "";
    complateUL.innerHTML = "";

    todoList.forEach((item, index) => {
        if (item.isComplate) {
            complateUL.appendChild(item.getHtml());
        } else {
            todoUL.appendChild(item.getHtml());
        }
    });
}

