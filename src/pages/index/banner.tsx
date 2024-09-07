import React, { FC } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  return (
    <Box className="" px={4} py={4}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
      >
        {[1, 2, 3]
          .map((i) => getDummyImage(`banner-${i}.webp`))
          .map((banner, i) => (
            <SwiperSlide key={i} className="">
              <Box
                className="w-full rounded-t-lg h-[180px] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner})` }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className=" px-2 py-2 flex items-center justify-between bg-white w-full rounded-b-lg" >
        <div className=" flex flex-col space-y-1">
          <div className=" flex items-center space-x-2 ">
            <img className=" h-[20px] aspect-square" src="https://pub-d79d527fdb044f488b110e2a9ab47e06.r2.dev/webIcon.png" alt="website" />
            <span className=" font-semibold text-sm text-[#0074BC] ">www.thangmayviettri.vn</span>
          </div>
          <div className=" flex items-center space-x-2">
            <img className=" h-[22px] aspect-square" src="https://pub-d79d527fdb044f488b110e2a9ab47e06.r2.dev/mailIcon.png" alt="salesGmail" />
            <span className=" font-semibold text-sm text-[#0074BC]">sales.viettri@gmail.com</span>
          </div>
        </div>
        <div className=" flex items-center space-x-2">
          <img className=" h-[24px] aspect-square" src="https://pub-d79d527fdb044f488b110e2a9ab47e06.r2.dev/phoneIcon.png" alt="phoneNumber" />
          <span className=" text-base font-bold text-red-600">0982 739 788</span>
        </div>
      </div>
    </Box>
  );
};
