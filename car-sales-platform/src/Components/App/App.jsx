import './Styles/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as LottiePlayer from "@lottiefiles/lottie-player";
import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import Catalog from "../Catalog/Catalog.jsx";
import CartPage from "../CartPage/CartPage.jsx";
import Checkout from "../Checkout/Checkout.jsx";
import Success from "../Success/Success.jsx";

import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/catalog/*"
                    element={
                        <ProtectedRoute>
                            <Catalog />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart/*"
                    element={
                        <ProtectedRoute>
                            <CartPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checkout/*"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/success/"
                    element={
                        <ProtectedRoute>
                            <Success />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
