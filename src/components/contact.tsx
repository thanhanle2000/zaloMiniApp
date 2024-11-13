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
          <a href="https://www.google.com/maps/place/C%C3%B4ng+Ty+TNHH+Thang+M%C3%A1y+Vi%E1%BB%87t+Tr%C3%AD/@10.7675441,106.5979213,15z/data=!4m14!1m7!3m6!1s0x31752c438bb0aca1:0x3d7ff7567000e52f!2zQ8O0bmcgVHkgVE5ISCBUaGFuZyBNw6F5IFZp4buHdCBUcsOt!8m2!3d10.7675441!4d106.5979213!16s%2Fg%2F11btrrprkp!3m5!1s0x31752c438bb0aca1:0x3d7ff7567000e52f!8m2!3d10.7675441!4d106.5979213!16s%2Fg%2F11btrrprkp?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
          <img
            className=" h-[36px] aspect-square rounded-full bg-white"
            src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/locationIcon.png"
            alt="location"
          />
          </a>
        </div>

        
      </div>
    </div>
  );
};
