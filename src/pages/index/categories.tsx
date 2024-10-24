import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, selectedCategoryIdState, userState } from "state";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

export const Categories: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const user = useRecoilValue(userState)
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


  return (
    
    <Box className=" flex flex-col pt-8 pb-10 bg-slate-100 px-4">
      <Box className=" flex items-center space-x-4 px-4">
        <div className=" relative rounded-full">
          <img className=" w-[60px] rounded-full aspect-square" src={user.avatar} alt="avatar" />
          <div className=" absolute bottom-2 right-0 w-[12px] aspect-square bg-green rounded-full "></div>
        </div>
        <span className=" text-base text-slate-600 font-semibold">{user.name}</span>
      </Box>
      <Box className=" mt-6 grid grid-cols-4 gap-x-2 gap-y-4">
        {categories.map((item) => (
          <div onClick={() => gotoCategory(item.type, item.id)} key={item.id} className=" flex flex-col items-center text-center space-y-1" >
            <div className=" bg-[#0068b2] rounded-md  p-[6px]">
              <img className=" max-w-[46px] aspect-square" src={item.icon} alt={item.id} />
            </div>
            <span className=" text-xs text-slate-700 max-w-[70px] ">{item.name}</span>
          </div>
        ))}
      </Box>
    </Box>
  );
};
