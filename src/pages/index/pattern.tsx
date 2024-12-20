import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { patternsState, selectedPatternIdState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { formatNumber } from "utils/utils";
import { useNavigate } from "react-router-dom";

export const RecommendContent: FC = () => {
  const patterns = useRecoilValue(patternsState);
  const navigate = useNavigate();
  const setSelectedPatternId = useSetRecoilState(selectedPatternIdState)

  const gotoCategory = (categoryId: string) => {
    setSelectedPatternId(categoryId);
    navigate("/pattern");
  };

  const gotoCategoryDefault = () => {
    setSelectedPatternId('cabin')
    navigate("/pattern");
  };

  return (
    <Box className=" pt-6 pb-8 border-b-2 border-slate-200 space-y-4 ">
      <div className=" flex items-center justify-between px-4">
        <span className=" text-lg font-bold text-slate-700">
          MẪU MÃ
        </span>
        <span onClick={() => gotoCategoryDefault()} className=" text-sm text-[#0074BC]">
          Xem tất cả
        </span>
      </div>
      <Swiper slidesPerView={2.2} spaceBetween={8} className="px-4">
        {patterns.map((category) => (
          <SwiperSlide key={category.lable}>
            <div onClick={() => gotoCategory(category.id)} className=" relative pb-2 flex flex-col items-center bg-white border-b-2 border-r border-slate-300 rounded-lg p-1 ">
              <div
                className="relative w-full aspect-[3/4] rounded-lg bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <span className="mt-2 text-sm font-semibold text-slate-700 ">{category.lable}</span>
              <span className=" text-xs text-[#0074BC] underline underline-offset-2">Xem chi tiết</span>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(3)];

  return (
    <Section title="MẪU MÃ" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Pattern: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
