import { StrictMode } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './components/App'
import Login from './components/pages/Login'
import Product from './components/pages/Product'
import Invoices from './components/pages/Invoices';
import Home from './components/pages/Home';
import Subscriptions from './components/pages/Subscriptions';

render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path=":productID" element={<Product />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  document.getElementById('root')
)
