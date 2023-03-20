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
            const todoCheckList = document.querySelector(".todo-check-list");
            const todoAddInput = document.querySelector(".todo-add-input");
            todoCheckList.innerHTML += `
                <input type="checkbox" class="todo-check">
                <div class="todo-message">${todoAddInput.value}</div>
                <button class="delete-button">❌</button>
            `;
        }
    }

    addEventTodoDeleteButton() {
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

    }

    loadTodoList() {

    }
}