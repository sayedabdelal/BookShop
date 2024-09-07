// DarkModeToggle.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../store/themeSlice';
 

const DarkModeToggle = () => {
    console.log('DarkModeToggle');
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <i
      className={`ri-${darkMode ? 'sun-line' : 'moon-line'} change-theme`}
      id="theme-button"
      onClick={() => dispatch(toggleDarkMode())}
      style={{ cursor: 'pointer', fontSize: '24px' }} // Add styling as needed
    />
  );
};

export default DarkModeToggle;
