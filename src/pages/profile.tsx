import React, { FC } from "react";
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { profileState, userInfoState, userState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";
import { authorize, getUserInfo } from "zmp-sdk/apis";

const ProfileContext: FC = () => {
  const profile = useRecoilValue(profileState);
  const user = useRecoilValue(userInfoState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const handleClick = async () => {
    try {
      const data = await authorize({
        scopes: ["scope.userInfo"], // Add necessary scopes
      });
      const { userInfo } = await getUserInfo();
      setUserInfo(userInfo);
    } catch (error) {
      console.error("Authorization or chat opening failed:", error);
    }
  };
  return (
    <Box className=" px-4 py-4">
      <Box className=" flex flex-col space-y-2 px-2 py-4 bg-white rounded-md">
        <div className=" flex flex-col items-center justify-center px-4">
          <span className="mt-4 text-base text-[#0068b2] font-semibold">
            THÔNG TIN NGƯỜI DÙNG
          </span>
        </div>
        {!!user.id ? (
          <>
            <div className=" flex items-center space-x-4 px-4 ">
              <span className=" text-base text-slate-600 min-w-[100px]">
                {" "}
                Avatar:{" "}
              </span>
              <div className=" relative rounded-full">
                <img
                  className=" w-[60px] rounded-full aspect-square"
                  src={user.avatar}
                  alt="avatar"
                />
                <div className=" absolute bottom-2 right-0 w-[12px] aspect-square bg-green rounded-full "></div>
              </div>
            </div>
            <div className=" flex items-center space-x-4 px-4 ">
              <span className=" text-base text-slate-600 min-w-[100px]">
                Nickname :
              </span>
              <span className=" text-base text-slate-600 font-semibold">
                {user.name}
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
