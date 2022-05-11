import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home'
import SingleUser from './pages/users/single/Single'
import NewUser from './pages/users/new/New'
import ListUser from './pages/users/list/List'

import SingleProduct from './pages/products/single/Single'
import NewProduct from './pages/products/new/New'
import ListProduct from './pages/products/list/List'

import SingleOrder from './pages/orders/single/Single'
import NewOrder from './pages/orders/new/New'
import ListOrder from './pages/orders/list/List'


import Login from './pages/login/Login'
import { productInputs, userInputs } from "./formSource";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="users">
            <Route index element={<ListUser />} />
            <Route path=":userId" element={<SingleUser />} />
            <Route path="new" element={<NewUser title="Create New User" inputs={userInputs} />} />
            <Route path="edit/:userId" element={<NewUser title="Edit User" inputs={userInputs} />} />
          </Route>
          <Route path="products">
            <Route index element={<ListProduct />} />
            <Route path=":productId" element={<SingleProduct />} />
            <Route path="new" element={<NewProduct title="Create New Product" inputs={productInputs} />} />
            <Route path="edit/:productId" element={<NewProduct title="Edit Product" inputs={productInputs} />} />
          </Route>
          <Route path="orders">
            <Route index element={<ListOrder />} />
            <Route path=":orderId" element={<SingleOrder />} />
            <Route path="new" element={<NewOrder title="Create New Order" inputs={productInputs} />} />
            <Route path="edit/:orderId" element={<NewOrder title="Edit Product" inputs={productInputs} />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  ); 
}

export default App;