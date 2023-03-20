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
        const todoAddInput = document.querySelector(".todo-add-input");
        const todoAddHidden = document.querySelector(".todo-add-hidden-blank div");

        todoAddButton.onclick = () => {
            if(todoAddInput.value == '') {
                TodoService.getInstance().blankTodo();
            }else {
                TodoService.getInstance().addTodo();
                todoAddHidden.classList.add("hidden-blank");
            }
            
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

    blankTodo() {
        const todoAddHidden = document.querySelector(".todo-add-hidden-blank div");
        if(todoAddHidden.classList.contains("hidden-blank")) {
            todoAddHidden.classList.remove("hidden-blank");
        }
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
        this.todoList.splice(deleteIndex,1);
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList()
    }

    loadTodoList() {
        const todoCheckList = document.querySelector(".todo-check-list");
        const todoAddInput = document.querySelector(".todo-add-input");
        todoCheckList.innerHTML = ``;
        this.todoList.forEach(todoObj => {
            todoCheckList.innerHTML += `
                <li class="todo-check-message">
                    <input type="checkbox" class="todo-check">
                    <div class="todo-message">${todoObj.todoContent}</div>
                    <button classs="delete-button">❌</button>
                </li>
            `;
        });
        TodoEvent.getInstance().addEventTodoDeleteButton();
    }
}