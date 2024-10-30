import "./Styles/Home.css"

import PreviewPage from "../PreviewPage/PreviewPage.jsx";
import BestGoods from "../BestGoods/BestGoods.jsx";
import backgroundImage from "./Images/mainBackground.png";

function Home() {
    return (
        <main className="Home">
            <div className="Home__bg-group">
                <img src={backgroundImage} alt="background" className="Home__background"/>
                <div className="Home__background-layer"></div>
            </div>
            <PreviewPage />
            <BestGoods />
        </main>
    )
}

export default Home