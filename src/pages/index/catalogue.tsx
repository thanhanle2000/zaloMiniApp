import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { patternsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router";
import { formatNumber } from "utils/utils";
import { openWebview } from "zmp-sdk/apis";

export const RecommendContent: FC = () => {

  const navigate = useNavigate()
  const patterns = useRecoilValue(patternsState);

  const handleClick = async (id: string) => {
    navigate(`/pdfViewer/${id}`)
    // const url = `https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/${id}.pdf`
    // try {
    //   await openWebview({
    //     url: url,
    //   });
    // } catch (error) {
    //   console.error("Failed to open location:", error);
    // }
  }

  return (
    <Box className=" pt-6 pb-8 border-b-2 border-slate-200 space-y-4 ">
      <div className=" flex items-center justify-between px-4">
        <span className=" text-lg font-bold text-slate-700">
          CATALOGUE
        </span>
        <span onClick={() => navigate('/overview/catalogue')} className=" text-sm text-[#0074BC]">
          Xem tất cả
        </span>
      </div>
      <Swiper slidesPerView={1.25} spaceBetween={12} className="px-4">
        {patterns.map((category) => (
          <SwiperSlide key={category.id}>
            <div
            onClick={(e) => {
              e.preventDefault()
              handleClick(category.id)
            }}
            className=" relative flex flex-col items-center bg-white border-b-2 border-r border-slate-300  rounded-lg  p-2 ">
              <div
                className="relative w-full aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${category.catalogImage})` }}
              />
              <div className=" flex w-full mt-1 px-4 items-center justify-between">
                <div className=" hover:bg-slate-100 px-2 ">
                <span className=" text-sm text-[#0074BC] underline underline-offset-2 ">XEM</span>
                </div>
                <div className=" hover:bg-slate-100 px-2 " >
                </div>
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
    <Section title="CATALOGUE" padding="title-only">
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

export const Catalogue: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
