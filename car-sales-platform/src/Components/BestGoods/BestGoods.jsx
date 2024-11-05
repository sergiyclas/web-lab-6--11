import "./Styles/BestGoods.css"

import {Box, Button, Grid2, Typography} from "@mui/material";
import CardWithImage from "../UI/CardWithImage/CardWithImage.jsx";

import mustang from "./Images/mustang_wiki.jpg";
import camaro from "./Images/camaro.jpg";
import charger from "./Images/charger.jpg";

import {useEffect, useState} from "react";
import gsap from "gsap";

let cars = [
    { description: "Super puper car", name: "Ford Mustang", image_url: mustang, backgroundColor: '#7C5840'},
    { description: "Really good car", name: "Chevrolet Camaro", image_url: camaro, backgroundColor: '#7C5840' },
    { description: "Recommend it, nice car", name: "Dodge Charger", image_url: charger, backgroundColor: '#7C5840' }
];

function BestGoods() {
    let [opened, setOpened] = useState(false);

    useEffect(() => {
        let tl = gsap.timeline();
        if (opened) {
            tl.fromTo(".BestGoods__text", {
                opacity: 0,
                y: 15
            }, {
                delay: 0.3,
                opacity: 1,
                y: 0,
                stagger: 0.2,
            })
        }

        return () => {
            tl.kill();
        }
    }, [opened]);

    let handleViewMoreBtnClick = () => {
        if (opened) {
            let tl = gsap.timeline();
            tl.fromTo(".BestGoods__text", {
                opacity: 1,
                y: 0
            }, {
                opacity: 0,
                y: -15,
                delay: 0.3,
                stagger: 0.2,
            })
            tl.then(() => setOpened(false))
        } else {
            setOpened(true)
        }
    }

    return (
        <Box component="section" className="BestGoods"
             padding={{xs: "25px", md: "25px 125px"}}
             display="flex"
             flexDirection="column"
             alignItems="center"
             justifyContent="center"
             gap="50px"
        >
            <Grid2 container className="BestGoods__cards" columns={{xs: 1, sm: 2, lg: 3}} alignContent="center"
                   spacing="35px">
                {
                    cars.map((item, index) =>
                        <Grid2 key={`car-container-${index}`} size={1}
                               sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <CardWithImage imageURL={item.image_url}
                                           caption={item.description}
                                           name={item.name}
                                           backgroundColor={item.backgroundColor}
                            />
                        </Grid2>
                    )
                }
            </Grid2>

            {
                opened &&
                <Box component="div">
                    <Typography className="BestGoods__text BestGoods__text_h2" component="h2" variant="h2"
                                textAlign="center">Buy there and be happy!</Typography>
                    <Typography className="BestGoods__text BestGoods__text_p" component="p" variant="body2"
                                textAlign="center">
                        Our car dealership offers more than just cars – we provide a seamless and personalized experience, prioritizing your satisfaction every step of the way. When you choose to buy from us, you’re choosing a dealership that cares deeply about your needs, preferences, and peace of mind.

                        Our diverse inventory features the latest models from trusted brands, each car thoroughly inspected to ensure the highest standards of safety and reliability. Whether you are looking for fuel efficiency, luxury, or performance, we have options that fit every budget and lifestyle. In addition to competitive pricing, we offer flexible financing solutions tailored to make your car-buying journey easy and stress-free.

                        Our team is dedicated, knowledgeable, and ready to answer any questions to help you find the perfect match. We also provide exceptional after-sale services, from regular maintenance to any potential repairs, ensuring your car stays in top condition long after your purchase.

                        At our dealership, we believe that buying a car should be an exciting and enjoyable experience, free of pressure and full of support. When you drive off our lot, you’ll feel confident in your choice, knowing you have made a valuable investment in a car that fits your lifestyle perfectly.
                    </Typography>
                </Box>
            }

            <Button onClick={handleViewMoreBtnClick}
                    variant="contained">
                {!opened ? "Are you trust me? Then - CLICK" : "No, please, don't push it"}
            </Button>
        </Box>
    )
}

export default BestGoods