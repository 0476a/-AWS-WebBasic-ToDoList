class TodoEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TodoEvent();
        }
        return this.#instance;
    }

    addEventTodoAddButton() {
        const todoAddButton = document.querySelector(".todo-add-button");
        todoAddButton.onclick = () => {
            TodoService.getInstance().addTodo();
        }
    }

    addEventTodoDeleteButton() {
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((deleteButton,index) => {
            deleteButton.onclick = () => {
                TodoService.getInstance().deleteTodo(index);
            }
        });
    }
}

class TodoService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TodoService();
        }
        return this.#instance;
    }

    todoList = null;

    constructor() {
        this.todoList = new Array();
    }

    addTodo() {
        const todoAddInput = document.querySelector(".todo-add-input");

        const todoObj = {
            todoContent: todoAddInput.value
        };
        this.todoList.push(todoObj);
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList();
    }

    deleteTodo(deleteIndex) {
        const todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.splice(deleteIndex,1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    loadTodoList() {
        const todoCheckList = document.querySelector(".todo-check-list");
            const todoAddInput = document.querySelector(".todo-add-input");
            todoCheckList.innerHTML += `
                <li class="todo-check-message">
                    <input type="checkbox" class="todo-check">
                    <div class="todo-message">${todoAddInput.value}</div>
                    <button class="delete-button">❌</button>
                </li>
            `;
            TodoEvent.getInstance().addEventTodoDeleteButton();
    }
}