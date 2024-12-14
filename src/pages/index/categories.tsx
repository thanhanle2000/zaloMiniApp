import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  categoriesState,
  existState,
  selectedCategoryIdState,
  userInfoState,
  userState,
} from "state";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { authorize } from "zmp-sdk/apis";
import { getUserInfo } from "zmp-sdk";


export const Categories: FC = () => {
  const [user, setUser] = useRecoilState(userInfoState)
  const categories = useRecoilValue(categoriesState);
  const exist = useRecoilValue(existState) 
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);
  const requestUserInfo = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const userInfo = await snapshot.getPromise(userState);
        if(userInfo.id && !exist) {
          const body =  {
            id: userInfo.id,
            name: userInfo.name,
            image: userInfo.avatar,
            companyRole1: "visiter"
          }
          try {
            const res = await fetch(`https://viet_tri_api.mkt-viettri.workers.dev/api/users/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `VIETTRI123`
              },
              body: JSON.stringify(body)
            })
          } catch (error) {
            console.log(error)
          }
          
        }
        setUser(userInfo)
      },
    []
  );
  useEffect(() => {
    if(!user.id) {
      if(exist) {
        requestUserInfo()
      }
    }
  }, [])


  const gotoCategory = (categoryType: string, categoryId: string) => {
    if (categoryType === "products") {
      setSelectedCategoryId(categoryId);
      navigate("/category");
    }
    if (categoryType === "feature") {
      switch (categoryId) {
        case "suaChua":
          navigate("/posts/VTES03");
          break;
        case "baoTri":
          navigate("/posts/VTES02");
          break;
        case "mauMa":
          navigate("/pattern");
          break;
        case "tinTuc":
          navigate("/overview/news");
          break;
        case "sieuKhuyenMai":
          navigate("/events");
          break;
        case "caiTaoThangMay":
          navigate("/caiTaoThangMay");
          break;
        default:
          navigate("/");
      }
    }
  };

  return (
    <Box className=" flex flex-col pt-8 pb-10 bg-slate-100 px-4">
      <Box className=" flex items-center space-x-4 px-4">
      { user.id ? (
          <>
            <div className=" relative rounded-full">
              <img
                className=" w-[60px] rounded-full aspect-square"
                src={user.avatar}
                alt="avatar"
              />
              <div className=" absolute bottom-2 right-0 w-[12px] aspect-square bg-green rounded-full "></div>
            </div>
            <span className=" text-base text-slate-600 font-semibold">
              {user.name}
            </span>
          </>
        ) : (
          <>
            <div>
              <div
                onClick={requestUserInfo}
                className=" text-sm bg-white border border-slate-300 text-[#0074BC] px-4 py-2 hover:bg-slate-200 rounded-md"
              >
                Đăng ký thành viên
              </div>
            </div>
          </>
        )}
      </Box>
      <Box className=" mt-6 grid grid-cols-4 gap-x-2 gap-y-4">
        {categories
          .filter(
            (item) => item.id !== "thangTaiRac" && item.id !== "toiTaiHang"
          )
          .map((item) => (
            <div
              onClick={() => gotoCategory(item.type, item.id)}
              key={item.id}
              className=" flex flex-col items-center text-center space-y-1"
            >
              <div className=" bg-[#0068b2] rounded-md  p-[6px]">
                <img
                  className=" max-w-[46px] aspect-square"
                  src={item.icon}
                  alt={item.id}
                />
              </div>
              <span
                className={` ${
                  item.id === "thangTaiOTo" ? "max-w-[60px]" : "max-w-[70px]"
                } text-xs text-slate-700`}
              >
                {item.name}
              </span>
            </div>
          ))}
      </Box>
    </Box>
  );
};
