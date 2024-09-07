import { Section } from "components/section";
import { ProductItem } from "components/product/item";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { recommendProductsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { formatNumber } from "utils/utils";

export const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(recommendProductsState);

  return (
    <Box className=" py-6 space-y-4 ">
      <div className=" flex items-center justify-between px-4">
        <span className=" text-lg font-bold text-slate-700">
          DEAL SẮP DIỄN RA
        </span>
        <span className=" text-sm text-[#0074BC]">
          Xem tất cả
        </span>
      </div>
      <Swiper slidesPerView={2.25} spaceBetween={12} className="px-4">
        {recommendProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(3)];

  return (
    <Section title="DEAL SẮP DIỄN RA" padding="title-only">
      <Swiper slidesPerView={1.2} spaceBetween={4} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Deal: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
