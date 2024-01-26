import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Layout from './layouts/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
)
