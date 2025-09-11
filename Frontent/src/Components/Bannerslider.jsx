import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Bannerslider = () => {
  const banners = [
    "https://i.ytimg.com/vi/MoGiagwDnn0/maxresdefault.jpg",
    "https://img.freepik.com/premium-psd/banner-template-online-fashion-sale_23-2148585403.jpg?w=2000",
    "https://yuvapatrkaar.com/static/c1e/client/107569/uploaded/fc5181e4277863b07300ec29e4962541.jpg?width=968&height=545&resizemode=4",
    "https://i.ytimg.com/vi/7C9NZVTqdXk/maxresdefault.jpg",
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className=" overflow-hidden"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-[400px] "
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};

export default Bannerslider;
