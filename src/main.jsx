import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './screens/Home.jsx';
import CollectionDetail from './screens/CollectionDetail.jsx';
import QuestionScreen from './screens/QuestionScreen.jsx';
import NotesScreen from './screens/NotesScreen.jsx';
import NoteReaderScreen from './screens/NoteReaderScreen.jsx';
import AboutScreen from './screens/AboutScreen.jsx';
import './styles.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'collections/:collectionSlug', element: <CollectionDetail /> },
      { path: 'sets/:setId', element: <QuestionScreen /> },
      { path: 'notes', element: <NotesScreen /> },
      { path: 'notes/:noteId', element: <NoteReaderScreen /> },
      { path: 'about', element: <AboutScreen /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
