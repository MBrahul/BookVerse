import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings'
import RoleBasedComponent from './components/Profile/RoleBasedComponent.jsx'
import AddBook from './components/Profile/AddBook'
import UpdateBook from './pages/UpdateBook'
import Home from './pages/Home'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './pages/Profile.jsx'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails.jsx'
import { authActions } from './store/auth.js'


const appMiddleware = () => {
  console.log("App Middlware");
  if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
    store.dispatch(authActions.login());
    store.dispatch(authActions.changeRole(localStorage.getItem("role")));
  }
  return null;
}


const authMiddleware = ({ request, context }, next) => {
  console.log("Auth Middleware");
  const auth = store.getState().auth;
  if (auth.isLoggedIn == false) {
    throw redirect('/log-in');
  }
  else next();
}

const adminRoleValidate = ({ request, context }, next) => {
  console.log("Role Validate Middleware");
  const auth = store.getState().auth;
  if (auth.role === "admin") {
    next();
  }
  else {
    throw redirect('/log-in');
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    middleware: [appMiddleware],
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/all-books",
        Component: AllBooks
      },
      {
        path: "log-in",
        Component: Login
      },
      {
        path: "sign-up",
        Component: SignUp
      },
      {
        path: "/cart",
        Component: Cart
      },
      {
        path: "/profile",
        Component: Profile,
        middleware: [authMiddleware],
        children: [
          {
            index: true,
            Component:RoleBasedComponent,
            // Component:AllOrders
          },
          {
            path: "orderHistory",
            Component: UserOrderHistory,
          },
          {
            path: "settings",
            Component: Settings,
          },
          {
            path: "add-book",
            middleware: [adminRoleValidate],
            Component: AddBook
          }
        ]
      },
      {
        path: "/view-book-details/:id",
        Component: ViewBookDetails
      },
      {
        path: "/update-book/:id",
        middleware: [authMiddleware, adminRoleValidate],
        Component: UpdateBook
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />,
    </Provider>
  </StrictMode>,
)
