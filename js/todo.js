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
                showCount.getInstance().updateCheckedCount();
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
        showCount.getInstance().totalCount();
        showCount.getInstance().updateCheckedCount();
    }

    deleteTodo(deleteIndex) {
        this.todoList.splice(deleteIndex,1);
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList()
        showCount.getInstance().totalCount();
        showCount.getInstance().updateCheckedCount();
    }

    loadTodoList() {
        const todoCheckList = document.querySelector(".todo-check-list");
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

    updateCheckedCount() {
        const checkButtons = document.querySelectorAll(".todo-check");
        const complete = document.querySelector(".complete");
        const ing = document.querySelector(".ing");
        let checkedCount = 0;
        let uncheckedCount = 0;
        if(checkButtons.length == 0) {
            ing.innerHTML = `
                <div class="todo-count-ing counts ing">진행중:${uncheckedCount}</div>
            `;
            complete.innerHTML = `
                <div class="todo-count-complete counts complete">완료:${checkedCount}</div>
            `;
        }
        checkButtons.forEach((checkButton) => {
            if (checkButton.checked) {
                checkedCount++;
                complete.innerHTML = `
                    <div class="todo-count-complete counts complete">완료:${checkedCount}</div>
                `;
                if(uncheckedCount == 0) {
                    ing.innerHTML = `
                    <div class="todo-count-ing counts ing">진행중:${uncheckedCount}</div>
                `;
                }
            } else {
                uncheckedCount++;
                ing.innerHTML = `
                <div class="todo-count-ing counts ing">진행중:${uncheckedCount}</div>
                `;
                if(checkedCount == 0) {
                    complete.innerHTML = `
                    <div class="todo-count-complete counts complete">완료:${checkedCount}</div>
                `;
                }
            }
        });
    }
}