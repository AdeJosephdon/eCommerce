import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useContext } from "react";
import { DataContext } from "./components/DataContext";
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
// import { config } from 'dotenv';
// config(); 


function App() {

  const { data } = useContext(DataContext);

  // console.log(data)

  
  const router = createBrowserRouter([
    {path: '/',
    element: data ? <Home data={data} /> : <Home /> ,
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
    element: <Wishlist data={data}/> 
    },
    {path: '/cart',
    element: <Cart data={data}/> 
    }
    ,
    {path: '/account',
    element: <Account data={data}/> 
    },
    {path: '/itemdescription/:productId',
    element: <ItemDescription data={data}/> 
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
