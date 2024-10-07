import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, selectedCategoryIdState } from "state";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

export const Categories: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryType: string, categoryId: string) => {
    if(categoryType === 'products') {
      setSelectedCategoryId(categoryId);
      navigate("/category");
    }
    if(categoryType === "feature") {
      switch (categoryId) {
        case "suaChua":
          navigate('/posts/VTES03')
          break
        case "baoTri": 
          navigate('/posts/VTES02')
          break
        case "mauMa":
          navigate('/pattern')
          break
        case "tinTuc":
          navigate('/overview/news')
          break
        case "sieuKhuyenMai": 
          navigate('/events')
          break
        case "miniGame":
          navigate('/games')
          break
        default: 
          navigate('/')
      }
    }
  };

  const iconLists = [0,2,4,6,8,10]

  return (
    
    <Box className="pt-8 pb-10 bg-white">
      <Swiper slidesPerView={4.1} spaceBetween={0} className=" px-4">
        {iconLists.map((item) => (
          <SwiperSlide key={item}>
            {categories.slice(item, item + 2).map((category, i) => (
              <div
              key={i}
              onClick={ () => gotoCategory(category.type, category.id)}
              className="flex flex-col items-center"
            >
              <img className="w-full p-1 h-full" src={category.icon} />
    
            </div>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
