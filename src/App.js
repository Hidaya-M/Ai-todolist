import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Task from "./pages/Task/task";
import Profile from "./pages/Profile/profile";

import Signin from "./pages/Sign/signin";
import Signup from "./pages/Sign/signup";
import Eroor from "./comp/Error/Eroor";
import Edittask from "./pages//EditTask/edittask";

// LEVEL2
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
// import alanBtn from '@alan-ai/alan-sdk-web';
// import { useEffect } from "react";

const App = () => {
  const { theme } = useContext(ThemeContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Eroor />,
    },

    {
      path: "/tasks",
      element: <Task />,
    },

    {
      path: "/profile",
      element: <Profile />,
    },

    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/edit/:Userid",
      element: <Edittask />,
    },
  ]);

  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
      {/* <button>
  <alanBtn onCommand={toggleTheme} />
</button> */}
    </div>
  );
};

export default App;
