import React, { FC } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { profileState, userState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const ProfileContext: FC = () => {
  const profile = useRecoilValue(profileState);
  const user = useRecoilValueLoadable(userState);
  return (
  <Box className=" px-4 py-4">
    <Box className=" flex flex-col space-y-2 px-2 py-4 bg-white rounded-md">
      <div className=" flex flex-col items-center justify-center px-4">
        <span className="mt-4 text-base text-[#0068b2] font-semibold">
          THÔNG TIN NGƯỜI DÙNG
        </span>
      </div>
      <div className=" flex items-center space-x-4 px-4 ">
        <span className=" text-base text-slate-600 min-w-[100px]"> Avatar: </span>
        <div className=" relative rounded-full">
          <img
            className=" w-[60px] rounded-full aspect-square"
            src={
              user.state === "hasValue"
                ? user.contents.avatar
                : "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoAvatar.png"
            }
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
          {user.state === "hasValue" ? user.contents.name : "Người dùng Zalo"}
        </span>
      </div>

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
