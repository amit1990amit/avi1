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
import './App.css';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
