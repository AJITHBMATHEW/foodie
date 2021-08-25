import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import ViewProduct from './components/ViewProduct/ViewProduct';
import AllProducts from './components/AllProducts/AllProducts';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forget-password">
          <RecoverPassword />
        </Route>
        <Route path="/products">
          <Navbar/>
          <AllProducts />
          <Footer/>
        </Route>
        <Route path="/product/:productId">
          <ViewProduct />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
