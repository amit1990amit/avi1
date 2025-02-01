// import React from 'react';
// // import logo from './logo.svg';
// // import './App.css';
// import './styles/app.scss'
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/HomePage";
// import ProductPage from "./pages/ProductPage";

// function App() {
//   return (
//     <>hhh</>
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<Home />} />
//     //     <Route path="/product/:id" element={<ProductPage />} />
//     //   </Routes>
//     // </Router>
//     // <div className="App">
//     //   <header className="App-header">
//     //     testttt
//     //   </header>
//     // </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./store/CartContext"
import Header from './components/Header'
import './App.css';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
