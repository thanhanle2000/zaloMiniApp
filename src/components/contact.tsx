import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router";

export const Contact: FC<{}> = ({}) => {
  return (
    <div className=" absolute bottom-8 right-0 z-[99999]">
      <div className=" flex flex-col items-center rounded-t-full bg-white/40 rounded-b-full shadow-lg  ">
        <div className=" p-[4px] ">
          <a href="https://zalo.me/239837943299975253">
          <img
            className=" h-[36px] aspect-square rounded-full"
            src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoAvatar.png"
            alt="logo"
          />
          </a>
        </div>
        <div className=" p-[6px] ">
          <a href="tel:+84982739788">
            <img
              className=" h-[36px] aspect-square rounded-full bg-white"
              src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/phoneIcon.png"
              alt="call"
            />
          </a>
        </div>
        <div className=" p-[6px]">
          <a href="https://maps.app.goo.gl/9VApb9jM2C98jA2KA">
          <img
            className=" h-[36px] aspect-square rounded-full bg-white"
            src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/locationIcon.png"
            alt="messages"
          />
          </a>
        </div>

        
      </div>
    </div>
  );
};
