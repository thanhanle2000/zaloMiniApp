import { Divider } from "components/divider";
import React, { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState, userInfoState, userState } from "state";
import { getUserInfo } from "zmp-sdk/apis";
import { Box, Header, Page } from "zmp-ui";

const ProfileContext: FC = () => {
  // STATE
  const [user, setUser] = useRecoilState(userInfoState)

  // RECOIL
  const profile = useRecoilValue(profileState);
  const existUser = useRecoilValue(userState)

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

    console.log(`body profile`, body)

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

  return (
    <Box className=" px-4 py-4">
      <Box className=" flex flex-col space-y-2 px-2 py-4 bg-white rounded-md">
        <div className=" flex flex-col items-center justify-center px-4">
          <span className="mt-4 text-base text-[#0068b2] font-semibold">
            THÔNG TIN NGƯỜI DÙNG
          </span>
        </div>
        {user?.id ? (
          <>
            <div className=" flex items-center space-x-4 px-4 ">
              <span className=" text-base text-slate-600 min-w-[100px]">
                Avatar:
              </span>
              <div className=" relative rounded-full">
                <img
                  className=" w-[60px] rounded-full aspect-square"
                  src={user?.avatar}
                  alt="avatar"
                />
                <div className=" absolute bottom-2 right-0 w-[12px] aspect-square bg-green rounded-full"></div>
              </div>
            </div>
            <div className=" flex items-center space-x-4 px-4 ">
              <span className=" text-base text-slate-600 min-w-[100px]">
                Nickname:
              </span>
              <span className=" text-base text-slate-600 font-semibold">
                {user?.name}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className=" flex flex-col items-center justify-center">
              <div
                onClick={handleClick}
                className=" w-fit text-sm bg-white border border-slate-300 text-[#0074BC] px-4 py-2 hover:bg-slate-200 rounded-md"
              >
                Đăng ký thành viên
              </div>
            </div>
          </>
        )}
      </Box>
    </Box>
  );
};

const ProfilePage: FC = () => {
  return (
    <Page>
      <Header
        title="Cá nhân"
        showBackIcon={false}
        textColor="white"
        backgroundColor="#0068b2"
      />
      <Divider />
      <ProfileContext />
    </Page>
  );
};

export default ProfilePage;
