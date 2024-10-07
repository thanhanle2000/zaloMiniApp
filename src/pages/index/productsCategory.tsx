import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productsCategoryState, selectedCategoryIdState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router";
import { Box, Text } from "zmp-ui";
import { formatNumber } from "utils/utils";

export const RecommendContent: FC = () => {
  const productsCategory = useRecoilValue(productsCategoryState);

  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate("/category");
  };

  const gotoCategoryDefault = () => {
    setSelectedCategoryId("thangTaiKhach");
    navigate("/category");
  };

  return (
    <Box className=" py-6 space-y-4 ">
      <div className=" flex items-center justify-between px-4">
        <span className=" text-lg font-bold text-slate-700">
          DANH MỤC SẢN PHẨM
        </span>
        <span onClick={() => gotoCategoryDefault()} className=" text-sm text-[#0074BC]">
          Xem tất cả
        </span>
      </div>
      <Swiper slidesPerView={2.2} spaceBetween={8} className="px-4">
        {productsCategory.map((category) => (
          <SwiperSlide key={category.lable}>
            <div onClick={() => {gotoCategory(category.categoryId)}} className=" relative pb-2 flex flex-col items-center bg-white border-b border-r border-slate-300  rounded-lg  p-1 ">
              <div
                className="flex flex-col items-center relative w-full aspect-[3/4] rounded-lg bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <span className=" text-xs font-semibold text-slate-700 pt-2">{category.lable}</span>
              <div className=" bg-[#0074BC] px-[10px] mt-1 rounded-md" >
                <span className=" text-xs text-white">XEM CHI TIẾT</span>
              </div>
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
    <Section title="DANH MỤC SẢN PHẨM" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <div>Đang tải dữ liệu ...</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const ProductsCategory: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
