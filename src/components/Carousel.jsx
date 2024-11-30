import React, { useRef } from "react";
import { Swiper, SwiperSlide,useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import  LeftNavigation from "./LeftNavigation";
import RightNavigation from "./RightNavigation"
import { Navigation } from "swiper/modules";
import axios from "axios";
import Cards from "./Card/Card";
import { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import styles from "./Carousel.module.css"

export default function Carousel({ data, component }) {
  return (
    <div style={{position:"relative", backgroundColor: "#121212", paddingLeft: "2rem"}}>
        <Swiper
        className={styles.mySwiper}
        initialSlide={0}
        modules={[Navigation]}
        allowTouchMove
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 5,
          },
          // Extra Large: xl (>=1200px)
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        <div className={styles.arrow}>
            <LeftNavigation />
            <RightNavigation />
        </div>
        {data.map((album) => (
          <SwiperSlide className={styles.swiperSlide}>{component(album)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}