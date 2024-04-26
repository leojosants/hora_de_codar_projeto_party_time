import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom';

import HomeRoute from './routes/HomeRoute/HomeRoute.jsx';
import CreatePartyRoute from './routes/CreatePartyRoute/CreatePartyRoute.jsx';
import PartyRoute from './routes/PartyRoute/PartyRoute.jsx';
import EditPartyRoute from './routes/EditPartyRoute/EditPartyRoute.jsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <HomeRoute />
        },
        {
          path: '/party/new',
          element: <CreatePartyRoute />
        },
        {
          path: '/party/:id',
          element: <PartyRoute />
        },
        {
          path: '/party/edit/:id',
          element: <EditPartyRoute />
        }
      ]
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);