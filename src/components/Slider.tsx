import React, { useState, useEffect, useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


// Styles must use direct files imports
// import 'swiper/swiper.scss'; // core Swiper

// import 'swiper/modules/navigation/navigation.scss'; // Navigation module
// import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import { getImageByUrl } from "../utils/utils";


type SliderProps = {
    data: any
};

const Slider = ({ data }: SliderProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Swiper
            className="swiper-container"
            modules={[Pagination]}
            pagination={true}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => {}}
            // pagination={{ clickable: true }}
            onSwiper={(swiper) => {}}
        >
            {data && data.length && data.map((item: any) => {
                return <SwiperSlide key={item.title}>
                    <img className="img" src={getImageByUrl(item.url)} alt={item.title} />
                </SwiperSlide>
            })}
        </Swiper>
    );
};

export default Slider;
