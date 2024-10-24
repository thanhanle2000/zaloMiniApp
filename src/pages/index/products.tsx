import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { patternsState, productsState, selectedPatternIdState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { formatNumber } from "utils/utils";
import { useNavigate } from "react-router-dom";
import { ProductItem } from "components/product/item";

export const RecommendContent: FC = () => {
  const products = useRecoilValue(productsState)
  const navigate = useNavigate();

  return (
    <Box className=" pt-6 pb-8 space-y-4 border-b-2 border-slate-200">
      <div className=" flex items-center justify-between px-4">
        <span className=" text-lg font-bold text-slate-700">
          SẢN PHẨM NỔI BẬT
        </span>
        <span onClick={() => navigate("/overview/products")} className=" text-sm text-[#0074BC]">
          Xem tất cả
        </span>
      </div>
      <Swiper slidesPerView={2.2} spaceBetween={8} className="px-4">
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(3)];

  return (
    <Section title="SẢN PHẨM NỔI BẬT" padding="title-only">
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

export const Products: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
