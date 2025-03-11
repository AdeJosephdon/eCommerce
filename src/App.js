import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import SignUp from './components/SignUp';
import NotFoundPage from './components/NotFoundPage';
import Billing from './components/Billing';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import Account from './components/Account';
import ItemDescription from './components/ItemDescription';
import Login from './components/Login';

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
