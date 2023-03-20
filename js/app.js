window.onload = () => {
    TodoService.getInstance();
    TodoEvent.getInstance().addEventTodoAddButton();
}