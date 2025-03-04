const initialState = {
    tasks: [],
  };
  
  export default function taskReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_TASK':
        return { ...state, tasks: [...state.tasks, action.payload] };
      case 'REMOVE_TASK':
        return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
      default:
        return state;
    }
  }