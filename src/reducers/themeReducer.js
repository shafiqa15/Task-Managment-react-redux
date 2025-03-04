
const initialTheme = {
    darkMode: window.localStorage.getItem('darkMode') === 'true',
  };
  
  export default function themeReducer(state = initialTheme, action) {
    switch (action.type) {
      case 'TOGGLE_THEME':
        window.localStorage.setItem('darkMode', !state.darkMode);
        return { ...state, darkMode: !state.darkMode };
      default:
        return state;
    }
  }