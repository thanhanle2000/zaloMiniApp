import React, { FC } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilValue } from "recoil";
import { Box } from "zmp-ui";
import { bannersState } from "state";

export const Banner: FC = () => {
  const banners = useRecoilValue(bannersState);
  return (
    <Box className=" px-4 py-4">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i} className="">
          <Box
            className="w-full rounded-t-lg h-[170px] bg-contain bg-no-repeat bg-center bg-skeleton"
            style={{ backgroundImage: `url(${banner})` }}
          />
        </SwiperSlide>
        ))}
      </Swiper>
      <div className=" px-2 py-2 flex flex-col bg-white w-full rounded-b-lg" >
        <div className=" flex flex-col space-y-1">
          <div className=" flex items-center space-x-2 ">
            <img className=" h-[20px] aspect-square" src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/webIcon.png" alt="website" />
            <span className=" font-semibold text-sm text-[#0074BC] ">www.thangmayviettri.vn</span>
          </div>
          <div className=" flex items-center space-x-2">
            <img className=" h-[22px] aspect-square" src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/mailIcon.png" alt="salesGmail" />
            <span className=" font-semibold text-sm text-[#0074BC]">sales.viettri@gmail.com</span>
          </div>
        </div>
        <div className=" flex mt-1 items-center space-x-2">
          <img className=" h-[24px] aspect-square" src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/phoneIcon.png" alt="phoneNumber" />
          <span className=" text-base font-bold text-red-600">0982 739 788</span>
        </div>
      </div>
    </Box>
  );
};
