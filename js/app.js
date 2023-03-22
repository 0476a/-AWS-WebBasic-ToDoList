window.onload = () => {
    TodoService.getInstance();
    TodoEvent.getInstance().addEventTodoAddButton();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    TodoEvent.getInstance().addEventClearCompleteButton();
}
