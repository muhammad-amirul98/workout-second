import "./App.css";
import Navbar from "./user/components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your theme
// import Home from "./user/pages/Home/Home";
// import Product from "./user/pages/Product/Product";
// import ProductDetail from "./user/pages/ProductDetail/ProductDetail";
// import Review from "./user/pages/Review/Review";
// import Cart from "./user/pages/Cart/Cart";
import Checkout from "./user/pages/Checkout/Checkout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        {/* <Home /> */}
        {/* <Product /> */}
        {/* <ProductDetail /> */}
        {/* <Review /> */}
        {/* <Cart /> */}
        <Checkout />
      </div>
    </ThemeProvider>
  );
}

export default App;
