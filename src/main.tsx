import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import { AuthProvider } from 'hooks/useAuth'
import { ProtectedRoute } from 'components/ProtectedRoute'
import Main from 'pages/Main'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import SignUp from 'pages/SignUp'
import BookCreate from 'pages/BookCreate'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<BookCreate />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
