import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import RegisterPage from "../pages/RegisterPage.jsx";
import CheckEmailPage from "../pages/CheckEmailPage.jsx";
import CheckPasswordPage from "../pages/CheckPasswordPage.jsx";
import Home from "../pages/Home.jsx";
import MessagePage from "../Components/MessagePage.jsx";
import Login from "../pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <RegisterPage /> },
      {
        path: "email",
        element: <CheckEmailPage />,
      },
      {
        path: "password",
        element: <CheckPasswordPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "",
        element: <Home />,
        children: [{ path: ":userId", element: <MessagePage /> }],
      },
    ],
  },
]);
export default router;
