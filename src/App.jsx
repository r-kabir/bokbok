import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RootLayout from "./components/RootLayout";
import Message from "./pages/Message";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/Login" element={<Login />}></Route>

      <Route path="/bokbok" element={<RootLayout />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="message" element={<Message />}></Route>
      </Route>
    </Route>
  )
);

function App() {

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App