import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home'
import SingleUser from './pages/users/single/Single'
import NewUser from './pages/users/new/New'
import ListUser from './pages/users/list/List'
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
          {/* <Route path="products">
            <Route index element={<List />} />
            <Route path=":productId" element={<Single />} />
            <Route path="new" element={<New title="Create New Product" inputs={productInputs} />} />
          </Route> */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;