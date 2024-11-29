
import PdfViewer from "components/pdfViewer";
import React, { Suspense } from "react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { postByIdState } from "state";
import { Post } from "types/product";
import { Page, Header, Box, Text } from "zmp-ui";


export const PdfViewerPage: FC = () => {

    const { postId } = useParams();

    let masterTitle = ""
    let pdfUrl = ""
    const handleTitle = () => {
      if(postId === "cabin") {
        masterTitle = "CATALOGUE CABIN"
        pdfUrl = "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/cabin.pdf"
      }
      if(postId === "cuaTang") {
        masterTitle = "CATALOGUE CỬA TẦNG"
        pdfUrl = "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/cuaTang.pdf"
      }
      if(postId === "sanCabin") {
        masterTitle = "CATALOGUE SÀN CABIN"
        pdfUrl = "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/sanCabin.pdf"
      }
      if(postId === "tranGia") {
        masterTitle = "CATALOGUE TRẦN GIẢ"
        pdfUrl = "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tranGia.pdf"
      }
      if(postId === "hoaVanInox") {
        masterTitle = "CATALOGUE HOA VĂN INOX"
        pdfUrl = "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/hoaVanInox.pdf"
      }
      if(postId === "vatLieu") {
        masterTitle = "CATALOGUE VẬT LIỆU"
        pdfUrl = "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieu.pdf"
      }
      if(postId === "tayVin") {
        masterTitle = "CATALOGUE TAY VỊN"
        pdfUrl = "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVin.pdf"
      }
      if(postId === "hib") {
        masterTitle = "CATALOGUE COP/HIB"
        pdfUrl = "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/hib.pdf"
      }
    }
    
    handleTitle()

    return (
      <Page className="flex flex-col ">
        <Header backgroundColor="#0068b2" textColor="white" title={masterTitle} />
        <Suspense>
          <PdfViewer pdfUrl={pdfUrl} />
          
        </Suspense>
      </Page>
    );
};
