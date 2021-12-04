import { v4 as uuidv4 } from 'uuid';

const initialState = [
  {
    title: 'Title heres',
    id: 'unique id here',
    completed: false,
    color: 'hex color here',
    categoryId: 'default',
    steps: [{ name: 'default step', completed: false, id: 'default step id' }],
  },
];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'todos/addTodo': {
      if (action.payload.categoryId === 'false') return state;
      return [
        ...state,
        {
          title: action.payload.title,
          id: uuidv4(),
          completed: false,
          color: action.payload.color,
          categoryId: action.payload.categoryId || 'default',
          steps: [],
        },
      ];
    }
    case 'todos/checkedTodo': {
      return state.map(e => {
        if (e.id === action.payload) return { ...e, completed: !e.completed };
        return e;
      });
    }
    case 'todos/renameStep': {
      return state.map(todo => {
        if (todo.id === action.payload.todoId)
          return {
            ...todo,
            steps: todo.steps.map(step => {
              if (step.id === action.payload.id)
                return { ...step, name: action.payload.name };
              return step;
            }),
          };
        return todo;
      });
    }
    case 'todos/renameTodo': {
      return state.map(todo => {
        if (todo.id === action.payload.todoId) {
          console.log('matches');
          return {
            ...todo,
            title: action.payload.name,
          };
        }
        console.log('no matcasd');
        return todo;
      });
    }
    case 'todos/addStep': {
      return state.map(todo => {
        if (todo.id === action.payload.todoId)
          return {
            ...todo,
            steps: [
              ...todo.steps,
              {
                name: action.payload.name,
                completed: false,
                id: action.payload.stepId,
              },
            ],
          };
        return todo;
      });
    }
    case 'todos/completeStep': {
      return state.map(todo => {
        if (todo.id === action.payload.todoId)
          return {
            ...todo,

            steps: todo.steps.map(step => {
              if (step.id === action.payload.stepId) {
                return { ...step, completed: !step.completed };
              }

              return step;
            }),
          };
        return todo;
      });
    }
    case 'todos/deleteTodo': {
      return state.filter(todo => todo.id !== action.payload);
    }
    case 'todos/deleteStep': {
      return state.map(todo => {
        if (todo.id === action.payload.todoId)
          return {
            ...todo,

            steps: todo.steps.filter(step => step.id !== action.payload.stepId),
          };
        return todo;
      });
    }
    case 'todos/changeColor': {
      return state.map(todo => {
        if (todo.id === action.payload.todoId)
          return {
            ...todo,

            color: action.payload.color,
          };
        return todo;
      });
    }

    default:
      return state;
  }
};

export default todos;
