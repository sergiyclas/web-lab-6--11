import './Styles/App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as LottiePlayer from "@lottiefiles/lottie-player";

import Home from "../Home/Home.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import Catalog from "../Catalog/Catalog.jsx";

import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/catalog/*" element={<Catalog/>}/>
            </Routes>
            <Footer />
        </>
    )
}

export default App
