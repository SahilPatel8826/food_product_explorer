import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { ProductProvider } from "./context/ProductContext";

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold text-center p-4 bg-grren">
            Food Product Explorer
          </h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:barcode" element={<ProductDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProductProvider>
  );
}
;
