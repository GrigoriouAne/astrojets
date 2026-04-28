import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import HomePage from "./pages/homePage/homePage";
import FerryRoutesPage from "./pages/homePage/ferryRoutesPage/ferryRoutesPage";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import ExploreNeaPeramosPage from "./pages/homePage/exploreNeaPeramosPage/exploreNeaPeramosPage";
import SignInPage from "./pages/homePage/signInPage/signInPage";
import SignUpPage from "./pages/homePage/signUpPage/signUpPage";
import BookingPage from "./pages/homePage/bookingPage/bookingPage";
import MyBookingsPage from "./pages/homePage/myBookingsPage/myBookingsPage";
import AdminPage from "./pages/homePage/adminPage/adminPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/ferry-routes" element={<FerryRoutesPage />} />
        <Route
          path="/explore-nea-peramos"
          element={<ExploreNeaPeramosPage />}
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
