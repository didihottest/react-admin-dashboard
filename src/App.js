import { Routes, Route, useNavigate } from "react-router-dom";
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


import SignUp from "./pages/signup/Signup";
import Login from './pages/login/Login'

import { productInputs, userInputs } from "./formSource";
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./private_routes/PrivateRoute";

import Axios from 'axios'
import useAuth from "./utils/auth";
import NotFound from "./pages/not_found/NotFound";

function App() {
  const authData = useAuth()
  const navigate = useNavigate()
  // Add a request interceptor
  Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (authData) {

      config.headers.Authorization = "Bearer " + authData.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  Axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response) {
      if (error.response.status == 401) {
        navigate('/login')
        localStorage.removeItem('auth')
        toast.error(error.response.data.message)
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;