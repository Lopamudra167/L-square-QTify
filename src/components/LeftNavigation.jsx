import styles from "./Carousel.module.css"
import React, { useEffect, useState } from "react";
import  {ReactComponent as LeftButton }  from "../assets/leftButton.svg"
import { useSwiper } from "swiper/react";


 const LeftNavigation =  () => {
    const swiper = useSwiper();
    const [isBegining, setIsBegining] = useState(swiper.isBeginning)
    useEffect(()=> {
        swiper.on("slideChange", function(){
            setIsBegining(swiper.isBeginning)
        })
    },[])
    return(
        <div className={styles.leftNavigation}>
            {!isBegining && <LeftButton onClick={()=>swiper.slidePrev()}  />}
        </div>
    )
 }
export default LeftNavigation