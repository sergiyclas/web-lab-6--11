import "./Styles/NotFoundPage.css"

// eslint-disable-next-line
import ImageData from "./Images/notFoundCat.json"

import {gsap} from "gsap"
import {useLayoutEffect} from "react";
import {Typography} from "@mui/material";

const funnyPhrases = [
    "Maybe you got lost",
    "Where are you?",
    "What do you mean?",
    "Anything here 😐",
    "Nothing 😶",
    "*The roll field rolls across the screen* 🌵🐪"
];


function NotFoundPage({children}) {
    let phrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)]

    useLayoutEffect(() => {
        let tl = gsap.timeline();
        tl.set(".NotFoundPage__message-block > *", {
            opacity: 0,
            y: -25
        })
            .set(".NotFoundPage__player", {
                opacity: 0,
                y: -25
            })
        tl.to(".NotFoundPage__player", {
            y: 0,
            opacity: 1,
            delay: 0
        }).to(".NotFoundPage__message-block > *", {
            stagger: 0.1,
            y: 0,
            opacity: 1,
            delay: 0
        })
    }, [])

    return (
        <div className="NotFoundPage">
            <lottie-player
                autoplay
                loop={true}
                mode="normal"
                src={`${JSON.stringify(ImageData)}`}
                style={{"width": "200px", "height": "200px"}}
                class="NotFoundPage__player"
                direction={1}
                speed={0.8}
            ></lottie-player>
            <div className="NotFoundPage__message-block">
                <Typography component="h2" variant="h2" className="NotFoundPage__headline">
                    {phrase}
                </Typography>
                <Typography component="p" variant="body1" className="NotFoundPage__description">
                    {
                        children || <>
                            This page does not exist. Reload or wait while this functionality will be done
                        </>
                    }
                </Typography>
            </div>
        </div>
    )
}

export default NotFoundPage