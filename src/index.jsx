
// // src/index.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { FirebaseContext } from './store/FirebaseContext';
// import { firebaseApp } from './firebase/Config';

// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);

// root.render(
//   <FirebaseContext.Provider value={firebaseApp}>
//     <App />
//   </FirebaseContext.Provider>
// );
// src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { FirebaseContext } from './store/FirebaseContext';
// import { firebaseApp, auth, firestore, storage } from './firebase/Config';

// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);

// root.render(
//   <FirebaseContext.Provider value={{ firebaseApp, auth, firestore, storage }}>
//     <App />
//   </FirebaseContext.Provider>
// );


// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import { auth, firestore, storage } from './firebase/Config';
import Context from './store/FirebaseContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <FirebaseContext.Provider value={{ auth, firestore, storage }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);

