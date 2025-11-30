import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import React, { useContext} from "react";
import { DataContext } from "./components/DataContext.js";

const Home = React.lazy(() => import("./pages/Home"));
const Contact = React.lazy(() => import("./pages/Contact"));
const About = React.lazy(() => import("./pages/About"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const Billing = React.lazy(() => import("./pages/Billing"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Account = React.lazy(() => import("./pages/Account"));
const ItemDescription = React.lazy(() => import("./pages/ItemDescription"));
const AddProductPage = React.lazy(() => import("./pages/AddProductPage"));
const SuccessfulPaymentPage = React.lazy(() => import("./pages/SuccessfulPaymentPage"));

// const LoadingFallback = () => (
//     <div style={{ padding: 40 }}>Loading...</div>
// );

function App() {
  const { auth } = useContext(DataContext);

  const router = createBrowserRouter([
    { path: "/", element: auth.authenticated ? <Home /> : <SignUp />, errorElement: <NotFoundPage /> },
    { path: "/home", element: <Home /> },
    { path: "/contact", element: <Contact /> },
    { path: "/about", element: <About /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/billing", element: <Billing /> },
    { path: "/wishlist", element: <Wishlist /> },
    { path: "/cart", element: <Cart /> },
    { path: "/account", element: <Account /> },
    { path: "/itemdescription/:productId", element: <ItemDescription /> },
    { path: "/login", element: <Login /> },
    { path: "/add-product-page", element: <AddProductPage /> },
    { path: "/successful-payment-page", element: <SuccessfulPaymentPage /> },
  ]);

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
