import React, { FC } from "react";
import { Box } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "state";

export const VoucherBanner: FC = () => {

  const userInfo = useRecoilValue(userState)

  return (
    <Box className="relative" p={4} pt={6}>
    <div className=" absolute z-10 top-0 left-0 w-full h-[50px] rounded-b-3xl bg-[#0068b2] "></div>
      <div className=" relative bg-white p-4 rounded-md shadow-md flex flex-col z-20" >
        <div className=" flex items-center justify-between">
          <div className=" flex items-center space-x-4">
            <img className=" h-[40px] aspect-square rounded-full " src={userInfo.avatar} alt="avatar" />
            <span className=" font-bold text-base text-slate-700 ">{userInfo.name}</span>
          </div>
          <span className=" font-bold text-lg text-slate-700 " >{0}điểm</span>
        </div>
        <div className=" flex items-center justify-center pt-2 ">
            <div className=" flex flex-col items-center w-[50%]">
                <img className=" h-[56px]" src="https://pub-d79d527fdb044f488b110e2a9ab47e06.r2.dev/wallet.png" alt="wallet" />
                <span className=" text-lg font-bold text-slate-600">Tích điểm</span>
            </div>
            <div className=" flex flex-col items-center w-[50%]">
                <img className=" h-[64px]" src="https://pub-d79d527fdb044f488b110e2a9ab47e06.r2.dev/voucher.png" alt="voucher" />
                <span className=" text-lg font-bold text-slate-600">Voucher</span>
            </div>
        </div>
      </div>
    </Box>
  );
};
