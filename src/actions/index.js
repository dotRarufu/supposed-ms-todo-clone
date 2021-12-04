export const addTodo = (title, color, categoryId) => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'todos/addTodo',
      payload: { title, color, categoryId },
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};

export const checkedTodo = id => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'todos/checkedTodo',
      payload: id,
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};

export const selectCategory = id => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'categories/selectCategory',
      payload: id,
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};

export const renameStep = (id, name, todoId) => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'todos/renameStep',
      payload: { id, name, todoId },
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};

export const renameTodo = (name, todoId) => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'todos/renameTodo',
      payload: { name, todoId },
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};

export const addStep = (name, todoId, stepId) => {
  return {
    type: 'todos/addStep',
    payload: { name, todoId, stepId },
  };
};

export const completeStep = (stepId, todoId) => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'todos/completeStep',
      payload: { todoId, stepId },
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};
export const deleteTodo = todoId => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'todos/deleteTodo',
      payload: todoId,
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};
export const deleteStep = (stepId, todoId) => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'todos/deleteStep',
      payload: { stepId, todoId },
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};
export const addCategory = name => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'categories/addCategory',
      payload: name,
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};

export const changeColor = (todoId, color) => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'todos/changeColor',
      payload: { todoId, color },
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};

export const deleteCategory = id => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'categories/deleteCategory',
      payload: id,
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};
export const renameCategory = (name, id) => {
  return async function (dispatch, getState) {
    dispatch({
      type: 'categories/renameCategory',
      payload: { name, id },
    });

    const stringedTodos = JSON.stringify(getState());
    localStorage.setItem('todos', stringedTodos);
  };
};
