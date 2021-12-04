import { v4 as uuidv4 } from 'uuid';

const initialState = [
  { name: 'default', selected: true, id: 'default' },
  { name: 'default1', selected: false, id: 'defaulta' },
  { name: 'default2', selected: false, id: 'default2' },
];

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'categories/addCategory': {
      return [
        ...state,
        { name: action.payload, selected: false, id: uuidv4() },
      ];
    }
    case 'categories/selectCategory': {
      return state.map(e => {
        if (e.id === action.payload) return { ...e, selected: true };
        return { ...e, selected: false };
      });
    }
    case 'categories/deleteCategory': {
      return state.filter(category => category.id !== action.payload);
    }
    case 'categories/renameCategory': {
      return state.map(category => {
        if (category.id === action.payload.id)
          return { ...category, name: action.payload.name };
        return category;
      });
    }
    default:
      return state;
  }
};

export default categories;
