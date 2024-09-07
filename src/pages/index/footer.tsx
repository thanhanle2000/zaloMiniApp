import React from "react";
import { FC } from "react";
import { Box } from "zmp-ui";

export const Footer: FC = () => {
  return (
    <Box className=" flex flex-col items-start mt-10 py-8 bg-slate-50 ">
      <img
        className=" h-[40px] object-contain"
        src="https://thangmayviettri.vn/wp-content/uploads/2020/05/logoVietTriPNG-300x68.png"
        alt="logo"
      />
      <div className=" flex flex-col space-y-1 items-start px-8 py-[12px] text-[#0074BC]">
        <span className=" text-base font-bold">Trụ sở chính</span>
        <div className=" flex items-center space-x-4">
          <img
            src="https://thangmayviettri.vn/wp-content/uploads/2020/05/location.png"
            alt="location"
          />
          <span className=" text-sm">
            878/1B Hương lộ 2, Khu phố 10, Phường Bình Trị Đông A, Quận Bình Tân, TP.HCM
          </span>
        </div>
        <div className=" flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12"
            viewBox="0 0 13.363 10.179"
          >
            <g id="email_1_" data-name="email (1)" transform="translate(0 -61)">
              <g
                id="Group_4181"
                data-name="Group 4181"
                transform="translate(0.671 61)"
              >
                <g id="Group_4180" data-name="Group 4180">
                  <path
                    id="Path_3189"
                    data-name="Path 3189"
                    d="M37.238,61H26.224a1.161,1.161,0,0,0-.5.118L31.705,67.1l1.341-1.289h0l4.7-4.695A1.161,1.161,0,0,0,37.238,61Z"
                    transform="translate(-25.721 -61)"
                    fill="#e82727"
                  ></path>
                </g>
              </g>
              <g
                id="Group_4183"
                data-name="Group 4183"
                transform="translate(8.827 61.672)"
              >
                <g id="Group_4182" data-name="Group 4182">
                  <path
                    id="Path_3190"
                    data-name="Path 3190"
                    d="M342.631,86.728l-4.418,4.418,4.418,4.418a1.161,1.161,0,0,0,.118-.5v-7.83A1.161,1.161,0,0,0,342.631,86.728Z"
                    transform="translate(-338.213 -86.728)"
                    fill="#e82727"
                  ></path>
                </g>
              </g>
              <g
                id="Group_4185"
                data-name="Group 4185"
                transform="translate(0 61.671)"
              >
                <g id="Group_4184" data-name="Group 4184">
                  <path
                    id="Path_3191"
                    data-name="Path 3191"
                    d="M.118,86.721a1.161,1.161,0,0,0-.118.5v7.83a1.161,1.161,0,0,0,.118.5l4.418-4.418Z"
                    transform="translate(0 -86.721)"
                    fill="#e82727"
                  ></path>
                </g>
              </g>
              <g
                id="Group_4187"
                data-name="Group 4187"
                transform="translate(0.671 66.643)"
              >
                <g id="Group_4186" data-name="Group 4186">
                  <path
                    id="Path_3192"
                    data-name="Path 3192"
                    d="M33.317,277.211,31.975,278.5a.391.391,0,0,1-.554,0l-1.289-1.289-4.418,4.418a1.161,1.161,0,0,0,.5.118H37.232a1.161,1.161,0,0,0,.5-.118Z"
                    transform="translate(-25.714 -277.211)"
                    fill="#e82727"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <div className=" flex flex-col">
            <span className=" text-sm">
              {`viettri.industry@gmail.com (CSKH)`}
            </span>
            <span className=" text-sm">
              {`sales.viettri@gmail.com (Kinh doanh)`}
            </span>
          </div>
        </div>
        <div className=" flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            viewBox="0 0 11.363 11.387"
          >
            <g id="phone" transform="translate(-0.539 0)">
              <g
                id="Group_4179"
                data-name="Group 4179"
                transform="translate(0.539 0)"
              >
                <path
                  id="Path_3188"
                  data-name="Path 3188"
                  d="M11.6,8.357,10.015,6.768a1.057,1.057,0,0,0-1.759.4,1.081,1.081,0,0,1-1.249.681A4.9,4.9,0,0,1,4.056,4.895a1.029,1.029,0,0,1,.681-1.249,1.057,1.057,0,0,0,.4-1.759L3.545.3A1.133,1.133,0,0,0,2.013.3L.935,1.376c-1.078,1.135.114,4.143,2.781,6.81s5.675,3.916,6.81,2.781L11.6,9.889A1.133,1.133,0,0,0,11.6,8.357Z"
                  transform="translate(-0.539 0)"
                  fill="#e82727"
                ></path>
              </g>
            </g>
          </svg>
          <span className=" text-base font-bold">0982 739 788</span>
        </div>
      </div>
    </Box>
  );
};
