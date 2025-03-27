import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
// Getting the root container element from the HTML file
const container = document.getElementById('root');
// Creating a root using React 18's createRoot method
const root = createRoot(container); 

// Rendering the App component inside Redux Provider to provide access to the store
root.render(
  <Provider store={store}>{/* Wrapping the app with Provider to pass down the Redux store */}
    <App />{/* Main application component */}
  </Provider>
);




