import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/productDetails";
import "./components/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<ProductsList />} />
          <Route path='/products/:productId' element={<ProductDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
