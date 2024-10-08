import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import RegisterPage from "../pages/RegisterPage.jsx";
import Home from "../pages/Home.jsx";
import MessagePage from "../Components/MessagePage.jsx";
import Login from "../pages/Login.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <RegisterPage /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "",
        element: <Home />,
        children: [{ path: "/user/:userId", element: <MessagePage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
export default Router;
