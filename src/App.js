import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Brands from './components/Brands/Brands';
import BrandDetails from './components/BrandDetails/BrandDetails';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider, { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Profile from './components/Profile/Profile';
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import Address from './components/Address/Address';
import Orders from './components/Orders/Orders';
import OrdersContextProvider from './Context/OrdersContext';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';


let routers =  createBrowserRouter([
  {path:'' , element:<Layout/>, children:[

    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute> },
    {path:'products' , element: <ProtectedRoute><Products/></ProtectedRoute> },
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'address' , element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'productdetails/:productId' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'BrandDetails/:Id' , element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
    {path:'categoryDetails/:id' , element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
    {path:'profile' , element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><Orders/></ProtectedRoute>},
    {path:'register' , element:<Register/>},
    {path:'login' , element:<Login/>},
    {path:'*' , element:<Notfound/>},
  ]}, 
  
])

function App() { 

  const {setUserToken} = useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[]);

  return (
    <Provider store={store}>
        <CartContextProvider>
        <CounterContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </CounterContextProvider>
        <Toaster/>
    </CartContextProvider>      
    </Provider>
    
  
  )
}

export default App;
