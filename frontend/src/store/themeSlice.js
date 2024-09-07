import { createSlice } from '@reduxjs/toolkit';

// Load state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('theme');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    // Handle read errors
    console.error('Could not load state from local storage:', err);
    return undefined;
  }
};

// Save state to local storage
const saveStateToLocalStorage = (state) => {
  try {
    console.log('Saving state to local storage:', state);
    const serializedState = JSON.stringify(state);
    localStorage.setItem('theme', serializedState);
  } catch (err) {
    // Handle write errors
    console.error('Could not save state to local storage:', err);
  }
};

// Initialize the state
const initialState = loadStateFromLocalStorage() || { darkMode: false };
console.log('Initial state:', initialState);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      console.log('Before toggle:', state);
      // Mutate the state object directly
      state.darkMode = !state.darkMode;
      console.log('After toggle:', state);
      saveStateToLocalStorage(state); // Save the whole state object
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
