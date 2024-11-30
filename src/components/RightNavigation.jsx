import  {ReactComponent as RightButton } from "../assets/rightButton.svg"
import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import styles from "./Carousel.module.css"
 
 const RightNavigation =  () => {
    const swiper = useSwiper();
    const [isEnd, setIsEnd] = useState(swiper.isEnd)
    useEffect(()=> {
        swiper.on("slideChange", function(){
            setIsEnd(swiper.isEnd);
        })
    },[])
    return(
        <div className={styles.rightNavigation}>
            {!isEnd && <RightButton onClick={()=>swiper.slideNext()}  />}
        </div>
    )
 }

export default RightNavigation