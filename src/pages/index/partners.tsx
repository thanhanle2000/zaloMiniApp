import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from "react";
import { Box } from "zmp-ui";

const logoList = [
    "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoFuji.png",
    "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoMitsu.png",
    "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoOtis.png",
    "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoSchindler.png"
]

export const Partners: FC = () => {
  return (
    <Box className="mt-4 py-6 space-y-4 bg-white border-b-2 border-slate-500">
        <div className=" w-full px-4">
        <span className=" text-lg font-semibold text-slate-500">CÁC ĐỐI TÁC</span>
        </div>
      <Swiper slidesPerView={4} autoplay spaceBetween={12} className="px-4">
        {logoList.map((logo, i) => (
          <SwiperSlide key={i}>
            <img className=" w-[60px] aspect-square " src={logo} alt={`logo${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
