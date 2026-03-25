import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import HomePage from "./pages/homePage/homePage";
import FerryRoutesPage from "./pages/homePage/ferryRoutesPage/ferryRoutesPage";
import ScrollToTop from "./components/scrollToTop/scrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/ferry-routes" element={<FerryRoutesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
