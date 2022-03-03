import { StrictMode } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './components/App'
import Login from './components/Login'
import Product from './components/Product'
import Invoices from './components/Invoices';
import Home from './components/Home';

render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path=":productID" element={<Product />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  document.getElementById('root')
)
