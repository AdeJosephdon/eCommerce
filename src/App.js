import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import SignUp from './pages/SignUp';
import NotFoundPage from './pages/NotFoundPage';
import Billing from './pages/Billing';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Account from './pages/Account';
import ItemDescription from './pages/ItemDescription';
import Login from './pages/Login';

// import { config } from 'dotenv';
// config(); 


function App() {

  // const { data } = useContext(DataContext);

  // console.log("App rendered")

  
  const router = createBrowserRouter([
    {path: '/',
    element: <Home/>,
    errorElement: <NotFoundPage />
    },
    {path: '/contact',
    element: <Contact /> 
    },
    {path: '/about',
    element: <About /> 
    },
    {path: '/signup',
    element: <SignUp /> 
    },
    {path: '/billing',
    element: <Billing /> 
    },
    {path: '/wishlist',
    element: <Wishlist /> 
    },
    {path: '/cart',
    element: <Cart /> 
    }
    ,
    {path: '/account',
    element: <Account /> 
    },
    {path: '/itemdescription/:productId',
    element: <ItemDescription /> 
    }
    ,
    {path: '/login',
    element: <Login /> 
    }
  ])

  return (
        <div className="App" >
    
          {/* {data ? <Home data={data} /> : <p>loading...</p> } */}

          <RouterProvider router={router} />

        </div>
  );
}

export default App;
