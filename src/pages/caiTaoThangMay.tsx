import { PostItem } from "components/post";
import React, { Suspense } from "react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { Page, Header, Box, Text } from "zmp-ui";



export const CaiTaoThangMayPage: FC = () => {

    const { type } = useParams();
    const navigate = useNavigate();

    return (
      <Page className="flex flex-col ">
        <Header backgroundColor="#0068b2" textColor="white" title="CẢI TẠO THANG MÁY" />
        <Suspense>
          <div className=" flex items-center justify-center py-4 px-4" >
            <span className=" text-slate-500">Đang cập nhật...</span>
          </div>
        </Suspense>
      </Page>
    );
};
