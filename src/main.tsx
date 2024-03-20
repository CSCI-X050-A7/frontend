import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from 'hooks/useAuth'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from 'routes'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector('#root')!)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </AuthProvider>
  </React.StrictMode>
)
