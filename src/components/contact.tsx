import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router";
import { openWebview, openChat, openPhone } from "zmp-sdk/apis";
import { useRecoilValue } from "recoil";
import { userInfoState } from "state";

export const Contact: FC<{}> = ({}) => {
  const user = useRecoilValue(userInfoState);
  const handleLocation = async () => {
    try {
      await openWebview({
        url: "https://www.google.com/maps/place/C%C3%B4ng+Ty+TNHH+Thang+M%C3%A1y+Vi%E1%BB%87t+Tr%C3%AD/@10.7675441,106.5979213,15z/data=!4m14!1m7!3m6!1s0x31752c438bb0aca1:0x3d7ff7567000e52f!2zQ8O0bmcgVHkgVE5ISCBUaGFuZyBNw6F5IFZp4buHdCBUcsOt!8m2!3d10.7675441!4d106.5979213!16s%2Fg%2F11btrrprkp!3m5!1s0x31752c438bb0aca1:0x3d7ff7567000e52f!8m2!3d10.7675441!4d106.5979213!16s%2Fg%2F11btrrprkp?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D",
      });
    } catch (error) {
      console.error("Failed to open location:", error);
    }
  };

  const handleChat = async () => {
    try {
      if(!!user.id) {
        await openChat({
          type: "oa",
          id: "3022539273724394240", // Your OA ID
          message: "Xin chào", // Optional initial message
        });
      } else {
        await openWebview({
          url: "https://zalo.me/viettriofficial",
        });
      }
    } catch (error) {
      console.error("Failed to open chat:", error);
    }
  };

  const handleCall = async () => {
    try {
      await openPhone({
        phoneNumber: "+84982739788",
      });
    } catch (error) {
      console.error("Failed to make call:", error);
    }
  };

  return (
    <div className="absolute bottom-8 right-0 z-[99999]">
      <div className="flex flex-col items-center rounded-t-full bg-white/40 rounded-b-full shadow-lg">
        <div className="p-[4px]">
          <div onClick={handleChat} className="cursor-pointer">
            <img
              className="h-[36px] aspect-square rounded-full"
              src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoAvatar.png"
              alt="logo"
            />
          </div>
        </div>
        <div className="p-[6px]">
          <div onClick={handleCall} className="cursor-pointer">
            <img
              className="h-[36px] aspect-square rounded-full bg-white"
              src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/phoneIcon.png"
              alt="call"
            />
          </div>
        </div>
        <div className="p-[6px]">
          <div onClick={handleLocation} className="cursor-pointer">
            <img
              className="h-[36px] aspect-square rounded-full bg-white"
              src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/locationIcon.png"
              alt="location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
