import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { projectsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { formatNumber } from "utils/utils";
import { useNavigate } from "react-router";

export const RecommendContent: FC = () => {
  const projects = useRecoilValue(projectsState);
  const navigate = useNavigate();
  const gotoPost = (postId: string) => {
    const url = `/posts/${postId}`;
    navigate(url);
  };

  return (
    <Box className=" py-6 space-y-4 ">
      <div className=" flex items-center justify-between px-4">
        <span className=" text-lg font-bold text-slate-700">
          DỰ ÁN TIÊU BIỂU
        </span>
        <span
          onClick={() => navigate("/overview/projects")}
          className="text-sm text-[#0074BC]"
        >
          Xem tất cả
        </span>
      </div>
      <Swiper slidesPerView={1.25} spaceBetween={12} className="px-4">
        {projects.map((post) => (
          <SwiperSlide key={post.id}>
            <div
              onClick={() => gotoPost(post.id)}
              className=" relative flex flex-col items-center bg-white border-b-2 border-r border-slate-300 rounded-lg p-1 "
            >
              <div
                className="relative w-full aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${post.thumbnail})` }}
              />
              <span className=" text-center text-sm font-bold text-slate-700 py-2 mt-1">
                {post.title}
              </span>
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
    <Section title="TIN TỨC" padding="title-only">
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

export const Projects: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
