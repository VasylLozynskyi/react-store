import React from "react";

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { ItemSlider } from "./components/ItemSlider";
import style from "./slidebar.module.scss";

export const SlideBar = (props) => {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1240 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1239, min: 666 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 665, min: 307 },
          items: 1,
          minwidth: "307px",
          slidesToSlide: 1 // optional, default to 1.
        }
    };  
    return (
        <div className={style.slider_container}>
                <Carousel
                     swipeable={false}
                     draggable={false}
                     showDots={false}
                     responsive={responsive}
                     autoPlay={props.deviceType !== "mobile" ? true : false}
                     ssr={true} // means to render carousel on server-side.
                     infinite={true}
                     autoPlaySpeed={3000}
                     keyBoardControl={true}
                     customTransition="all .5"
                     transitionDuration={500}
                     arrows={true}
                     removeArrowOnDeviceType={["tablet", "mobile"]}
                     containerClass="carousel-container"
                > 
            
        {props.slide_datas.map((slide) => (
           <ItemSlider
                key = {slide.id}
                id ={slide.id}
                name = {slide.name}
                img = {slide.url} 
            >
            </ItemSlider> 
        ))} 
                </Carousel>
        </div>
    );
}
export default SlideBar;