import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";
import {
  categoriesState,
  selectedCategoryIdState,
  userInfoState,
  userState,
} from "state";
import { getUserInfo } from "zmp-sdk";
import { Box } from "zmp-ui";

export const Categories: FC = () => {
  // HOOK
  const navigate = useNavigate();

  // STATE
  const [user, setUser] = useRecoilState(userInfoState)

  // RECOIL
  const categories = useRecoilValue(categoriesState);
  const existUser = useRecoilValue(userState);
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  // API URL & HEADERS
  const API_URL = `https://viet_tri_api.mkt-viettri.workers.dev/api/users/create`;
  const API_HEADERS = {
    "Content-Type": "application/json",
    Authorization: "VIETTRI123",
  };

  // HANDLE UPDATE USER
  const handleUpdateUser = async (userInfo: any) => {
    // BODY
    const body = {
      id: userInfo?.id,
      name: userInfo?.name,
      image: userInfo?.avatar,
      companyRole1: "visiter",
    };

    console.log(`body`, body)

    try {
      // RESPONSE
      const response = await fetch(API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON?.stringify(body),
      });

      if (!response.ok)
        console.error("Failed to update user:", await response.text());
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // HANDLE CLICK
  const handleClick = async () => {
    if (existUser?.id) return;

    try {
      const { userInfo } = await getUserInfo({ autoRequestPermission: true });

      if (userInfo?.id) {
        setUser(userInfo);
        await handleUpdateUser(userInfo);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // USE EFFECT
  useEffect(() => {
    if (!user?.id && existUser?.id) setUser(existUser);
  }, [user?.id, existUser?.id]);


  // GOTO CATEGORY
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
        {user?.id ? (
          <>
            <div className=" relative rounded-full">
              <img
                className=" w-[60px] rounded-full aspect-square"
                src={user?.avatar}
                alt="avatar"
              />
              <div className=" absolute bottom-2 right-0 w-[12px] aspect-square bg-green rounded-full "></div>
            </div>
            <span className=" text-base text-slate-600 font-semibold">
              {user?.name}
            </span>
          </>
        ) : (
          <>
            <div>
              <div
                onClick={handleClick}
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
          ?.filter(
            (item) => !["thangTaiRac", "toiTaiHang"].includes(item?.id)
          )
          .map((item) => (
            <div
              onClick={() => gotoCategory(item?.type, item?.id)}
              key={item?.id}
              className=" flex flex-col items-center text-center space-y-1"
            >
              <div className=" bg-[#0068b2] rounded-md  p-[6px]">
                <img
                  className=" max-w-[46px] aspect-square"
                  src={item?.icon}
                  alt={item?.id}
                />
              </div>
              <span
                className={`${item?.id === "thangTaiOTo" ? "max-w-[60px]" : "max-w-[70px]"
                  } text-xs text-slate-700`}
              >
                {item?.name}
              </span>
            </div>
          ))}
      </Box>
    </Box>
  );
};
