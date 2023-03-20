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

    addEventTodoCheckClick() {
        const checkButtons = document.querySelectorAll(".todo-check");
        checkButtons.forEach((checkButton,index) => {
            checkButton.onclick = () => {
                const todoMessages = document.querySelectorAll(".todo-message");
                if(checkButton.checked) {
                    todoMessages[index].style.textDecoration = "line-through";
                } else {
                    todoMessages[index].style.textDecoration = "none";
                }
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
        showCount.getInstance().totalCount();
    }

    deleteTodo(deleteIndex) {
        this.todoList.splice(deleteIndex,1);
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList()
        showCount.getInstance().totalCount();
    }

    loadTodoList() {
        const todoCheckList = document.querySelector(".todo-check-list");
        todoCheckList.innerHTML = ``;
        this.todoList.forEach(todoObj => {
            todoCheckList.innerHTML += `
                <li class="todo-check-message">
                    <input type="checkbox" class="todo-check">
                    <div class="todo-message">${todoObj.todoContent}</div>
                    <button class="delete-button">❌</button>
                </li>
            `;
        });
        TodoEvent.getInstance().addEventTodoDeleteButton();
        TodoEvent.getInstance().addEventTodoCheckClick();
    }

    
}

class showCount {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new showCount();
        }
        return this.#instance;
    }

    totalCount() {
        const all = document.querySelector(".all");
        all.innerHTML = `
            <div class="todo-count-all counts all">전체:${TodoService.getInstance().todoList.length}</div>
        `
    }
}