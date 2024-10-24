import React, { FC, Suspense, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  dataByTypeState,
  productByIdState,
  productsByCategoryState,
} from "state";
import { Box, Header, Page, Sheet, Tabs } from "zmp-ui";
import { useNavigate, useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { formatNumber } from "utils/utils";
import { PostItem } from "components/post";
import { Product, Section } from "types/product";

const techCategories = [
  {
    id: "techSpec",
    label: "Đặc tính kỹ thuật",
  },
  {
    id: "techDrawing",
    label: "Bản vẽ kỹ thuật",
  },
  {
    id: "spec",
    label: "Thông số kỹ thuật",
  },
  {
    id: "power",
    label: "Nguồn điện",
  },
  {
    id: "shaft",
    label: "Chuẩn bị hố thang",
  },
  // {
  //   id: "images",
  //   label: "Hình ảnh thực tế",
  // },
  // {
  //   id: "videos",
  //   label: "Video",
  // },
];

const defaultTechSpec: { [key: string]: { [key: string]: Section[] } } = {
  thangTaiKhach: {
    techSpec: [
      {
        type: "subheader",
        content: ["Thang Máy Tải Khách"],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Tải trọng : từ 320 kg - 2.000 kg",
          "Tốc độ    : từ 30 m/ph - 150 m/ph",
          "Kiểu thang: CPM, KPM, phòng máy mini",
          "Sử dụng: văn phòng, khách sạn thấp tầng (từ 10 tầng trở xuống), chung cư,…",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["Ưu điểm của thang máy tải khách:"],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Thiết kế bền nhẹ, kiểu dáng đa dạng, sang trọng",
          "Tiết kiệm điện nhờ máy kéo không hộp số, hiệu suất cao",
          "Vận hành êm, an toàn khi sử dụng",
          "Cửa chống cháy, hệ thống giám sát nhóm thang máy",
        ],
      },
    ],
    techDrawing: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiKhachBVKT.jpg",
        ],
      },
    ],
    spec: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiKhachTSKT.jpg",
        ],
      },
    ],
    power: [
      {
        type: "paragraph",
        content: [
          "Cung cấp điện 3 pha 380VAC, 3KVA/1kw, nguồn điện bao gồm 5 dây: 3 dây pha, 1 dây trung tính và 1 dây tiếp đất (dây tiếp đất không dùng chung với dây chống sét của tòa nhà)",
        ],
      },
      {
        type: "space",
      },
      {
        type: "bulletList",
        content: [
          "Nguồn động lực: 3phases 380V-50 HZ",
          "Nguồn chiếu sáng: 1phases 220V-50 HZ",
          "Nguồn tín hiệu an toàn: 24VDC",
        ],
      },
    ],
    shaft: [
      {
        type: "space",
      },
    ],
    // images: [
    //   {
    //     type: "space",
    //   },
    // ],
    // videos: [
    //   {
    //     type: "space",
    //   },
    // ],
  },
};

const elevatorType : { [key: string] : { 
  tranPhongThang: { moTaViTri: string[], luaChon: string[]} ,
  chieuSang: { moTaViTri: string[], luaChon: string[]},
  vachCabin: { moTaViTri: string[], luaChon: string[]},
  vatLieuCuaCabin: { moTaViTri: string[], luaChon: string[]},
  vatLieuCuaTang: { moTaViTri: string[], luaChon: string[]},
  nepChanVach: { moTaViTri: string[], luaChon: string[]},
  sanPhongThang: { moTaViTri: string[], luaChon: string[]},
  tayVin: { moTaViTri: string[], luaChon: string[], hinhDang?: string[]}
} } = {

  ELITE: {
    tranPhongThang : {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tranPhongThangLocation.png",
      ],

      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
      ],
    },
    chieuSang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/chieuSangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/centerLight.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/line.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/roundSpots.png"
  
      ],
    },
    vachCabin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation3.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/capriYellow.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/sanMarinoBlue.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/polarWhite.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
  
      ],
    },
    vatLieuCuaCabin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieuCuaCabinLoaction1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelLausanneLinen.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
  
      ],
    },
    vatLieuCuaTang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieuCuaTangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedBordeauxRed.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedHavannaGold.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedViennaBeige.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedLightGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelBrushedVibration.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelPolishMirror.png",
      ],
    },
    nepChanVach: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/nepChanVachLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/flush.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/protruding.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/aluAnodized.png",
  
      ],
    },
    sanPhongThang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/sanPhongThangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteSand.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/aritificialGraniteBrown.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteBlack.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/rubberSpeckledLightGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/rubberSpeckledBlack.png",
  
      ],
    },
    tayVin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation3.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation4.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation5.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
  
      ],
      hinhDang: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape3.png",
      ],
    }
  },
  LUXURY: {
    tranPhongThang : {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tranPhongThangLocation.png",
      ],

      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
      ],
    },
    chieuSang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/chieuSangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/centerLight.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/line.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/roundSpots.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/squareSpots.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/bracket.png"
  
      ],
    },
    vachCabin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation3.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelLausanneLinen.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
  
      ],
    },
    vatLieuCuaCabin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieuCuaCabinLoaction1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelLausanneLinen.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
  
      ],
    },
    vatLieuCuaTang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieuCuaTangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedBordeauxRed.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedHavannaGold.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedViennaBeige.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedLightGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelBrushedVibration.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelPolishMirror.png",
      ],
    },
    nepChanVach: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/nepChanVachLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/flush.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/protruding.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/aluAnodized.png",
  
      ],
    },
    sanPhongThang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/sanPhongThangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteSand.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/aritificialGraniteBrown.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteBlack.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/rubberSpeckledLightGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/rubberSpeckledBlack.png",
  
      ],
    },
    tayVin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation3.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation4.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation5.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
  
      ],
      hinhDang: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape3.png",
      ],
    }
  },
  PREMIUM: {
    tranPhongThang : {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tranPhongThangLocation.png",
      ],

      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelDohaGold.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelZurichDarkBrushed.png",
      ],
    },
    chieuSang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/chieuSangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/centerLight.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/line.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/roundSpots.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/squareSpots.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/bracket.png"
  
      ],
    },
    vachCabin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinLocation3.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelDohaGold.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelZurichDarkBrushed.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vancouverWood.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/arosaWood.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/glass.png",
  
      ],
    },
    vatLieuCuaCabin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieuCuaCabinLoaction1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelLausanneLinen.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelZurichDarkBrushed.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelDohaGold.png",
  
      ],
    },
    vatLieuCuaTang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieuCuaTangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedBordeauxRed.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedHavannaGold.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedViennaBeige.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedLightGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelBrushedVibration.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelPolishMirror.png",
      ],
    },
    nepChanVach: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/nepChanVachLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/flush.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/protruding.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/aluAnodized.png",
  
      ],
    },
    sanPhongThang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/sanPhongThangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteSand.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/aritificialGraniteBrown.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteBlack.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/rubberSpeckledLightGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/rubberSpeckledBlack.png",
  
      ],
    },
    tayVin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation3.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation4.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation5.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
  
      ],
      hinhDang: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape3.png",
      ],
    }
  },
  PANORAMA: {
    tranPhongThang : {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tranPhongThangLocation.png",
      ],

      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
      ],
    },
    chieuSang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/chieuSangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/centerLight.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/line.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/roundSpots.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/squareSpots.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/bracket.png"
  
      ],
    },
    vachCabin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinHong1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinHong2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinSau1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vachCabinSau2.png",
      ],
      luaChon: [],
    },
    vatLieuCuaCabin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieuCuaCabinLoaction1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline443.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelLausanneLinen.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
  
      ],
    },
    vatLieuCuaTang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/vatLieuCuaTangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedBordeauxRed.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedHavannaGold.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedViennaBeige.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedLightGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelBrushedVibration.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelPolishMirror.png",
      ],
    },
    nepChanVach: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/nepChanVachLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/flush.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/protruding.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/aluAnodized.png",
  
      ],
    },
    sanPhongThang: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/sanPhongThangLocation1.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteSand.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/aritificialGraniteBrown.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/artificialGraniteBlack.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/rubberSpeckledLightGrey.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/rubberSpeckledBlack.png",
  
      ],
    },
    tayVin: {
      moTaViTri: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation3.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation4.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinLocation5.png",
      ],
      luaChon: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelMontreuxMirror.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/steelHairline.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/paintedWhiteAlu.png",
  
      ],
      hinhDang: [
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape1.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape2.png",
        "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/tayVinShape3.png",
      ],
    }
  },
};

const selectList1 = [
  {
    id: "tranPhongThang",
    label: "Trần phòng thang",
  },
  {
    id: "vachCabin",
    label: "Vách cabin",
  },
  {
    id: "vatLieuCuaTang",
    label: "Vật liệu cửa tầng",
  },
  {
    id: "sanPhongThang",
    label: "Sàn phòng thang",
  },
];

const selectList2 = [
  {
    id: "chieuSang",
    label: "Chiếu sáng",
  },
  {
    id: "vatLieuCuaCabin",
    label: "Vật liệu cửa cabin",
  },
  {
    id: "nepChanVach",
    label: "Nẹp chân vách",
  },
  {
    id: "tayVin",
    label: "Tay vịn",
  },
];

const ProductTemplate: FC<{ productId: string | undefined }> = ({
  productId,
}) => {
  const [sheetData, setSheetData] = useState<{ moTaViTri: string[], luaChon: string[], hinhDang?: string[]}>({moTaViTri: [], luaChon: []}) 
  const [sheetVisible, setSheetVisible] = useState(false);
  const products = useRecoilValue(dataByTypeState(productId)) as Product[];
  const productsByCategory = useRecoilValue(
    productsByCategoryState(products[0].categoryId)
  ).filter((product) => product.subCategory === productId?.toLowerCase());

  const navigate = useNavigate();

  const gotoProduct = (productId: string) => {
    const url = `/category/${productId}`;
    navigate(url);
  };

  const handleClick = (itemId: string) => {
    if(!! productId ) {
      const sheetDataMount = elevatorType[productId][itemId] as { moTaViTri: string[], luaChon: string[], hinhDang?: string[]}
      setSheetData(sheetDataMount)
      console.log(sheetData)
    }
    setSheetVisible(true);
  };

  if (products.length > 0) {
    return (
      <Box>
        <Box>
          <div>
            {products[0].refImages ? (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                autoplay
                loop
              >
                {products[0].refImages.map((image, i) => (
                  <SwiperSlide key={i}>
                    <div className=" flex flex-col items-center py-2">
                      <img
                        className=" h-[300px]"
                        src={image}
                        alt={i.toString()}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <></>
            )}
          </div>
        </Box>
        <Box className=" flex flex-col pt-4 pb-8 px-10 text-slate-700">
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Mã sản phẩm</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].id}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Cửa tầng chính</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.lobby}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Cửa tầng khác</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.floors}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Cửa cabin</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.cabinDoor}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Bao che</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.gfnf}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Trần</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.ceiling}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Sàn cabin</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.cabinFloor}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Vách trước</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.frontWall}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Vách sau</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.backWall}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">Vách hông</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.sideWall}
            </span>
          </div>
          <div className=" flex items-center space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600">
                {products[0].categoryId === "thangTaiHang"
                  ? "Nẹp bảo vệ"
                  : "Tay vịn"}
              </span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {products[0].info?.handrail}
            </span>
          </div>
        </Box>
        <Box className=" px-4 ">
          <div className=" flex flex-col items-center border-t-2 border-slate-400 pt-6 pb-10">
            <span className=" font-semibold text-lg text-slate-700">
              PHƯƠNG ÁN TÙY CHỌN
            </span>
            <div className=" mt-4 flex items-start space-x-2">
              <div className=" flex flex-col items-center space-y-[6px] ">
                {selectList1.map((item) => (
                  <span
                    onClick={() => handleClick(item.id)}
                    className=" px-2 text-sm w-full py-1 bg-slate-300 border text-center border-[#0074BC] text-[#0074BC] rounded-lg "
                  >
                    {item.label}
                  </span>
                ))}
              </div>
              <div className=" flex flex-col items-center space-y-[6px] ">
                {selectList2.map((item) => (
                  <span
                    onClick={() => handleClick(item.id)}
                    className=" px-2 text-sm w-full py-1 bg-slate-300 border text-center border-[#0074BC] text-[#0074BC] rounded-lg "
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <div className=" mt-6 bg-[#0074BC] px-4 py-1 flex flex-col items-center rounded-md">
              <a href="tel:+84982739788" className=" text-sm text-white ">
                ĐẶT LỊCH TƯ VẤN
              </a>
            </div>
          </div>
        </Box>
        <Box className="px-4">
          <Tabs scrollable className="category-tabs rounded-lg">
            {techCategories.map((category) => (
              <Tabs.Tab key={category.id} label={category.label}>
                <Suspense>
                  <div className=" bg-slate-50 px-4 py-4 content-center min-h-[200px]">
                    {products[0].techInfo?.techSpec ? (
                      <PostItem sections={products[0].techInfo?.techSpec} />
                    ) : (
                      <PostItem
                        sections={defaultTechSpec.thangTaiKhach[category.id]}
                      />
                    )}
                  </div>
                </Suspense>
              </Tabs.Tab>
            ))}
          </Tabs>
          {/* <Box className=" bg-slate-50 py-6 px-4 flex flex-col items-center space-y-2">
          <span className=" font-semibold text-base text-[#0074BC]">
            Để được tư vấn thêm thông tin:
          </span>
          <div className=" bg-red-600 w-full max-w-[280px] flex flex-col items-center py-[6px] rounded-md">
            <a href="tel:+84982739788" className=" font-bold text-white ">
              TƯ VẤN MIỄN PHÍ
            </a>
          </div>
        </Box> */}
        </Box>
        <Box className=" py-6 space-y-4 ">
          <div className=" flex items-center justify-between px-4">
            <span className=" text-lg font-bold text-slate-700">
              SẢN PHẨM CÙNG DANH MỤC
            </span>
          </div>
          <Swiper slidesPerView={2.15} spaceBetween={8} className="px-4">
            {productsByCategory.map((product) => (
              <SwiperSlide key={product.id}>
                <Box className=" w-full ">
                  <div
                    onClick={() => gotoProduct(product.id)}
                    className=" relative w-full h-full  pb-2 flex flex-col items-center bg-white border-b border-r border-slate-300  rounded-lg  p-1 "
                  >
                    <div
                      className="relative w-full aspect-[3/4] rounded-lg bg-cover bg-center bg-skeleton"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className=" flex flex-col h-full items-center justify-center">
                      <span className=" mt-1 font-bold text-slate-700">
                        {product.name}
                      </span>
                      {product.sale?.type === "percent" ? (
                        <div className=" flex items-center space-x-2">
                          <span className=" text-sm text-slate-900 line-through">
                            {formatNumber(product.price)}đ
                          </span>
                          <span className=" bg-red-600 text-white text-sm font-semibold p-[2px] rounded-md">
                            -
                            {product.sale?.type === "percent"
                              ? product.sale.percent * 100
                              : ""}
                            %
                          </span>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {product.sale?.type === "percent" ? (
                        <span className=" text-sm font-bold text-[#0074BC] ">
                          {formatNumber(
                            product.price * (1 - product.sale.percent)
                          )}
                          đ
                        </span>
                      ) : (
                        <span className=" text-xs text-[#0074BC] ">
                          {product.price > 0
                            ? `${formatNumber(product.price)}}đ`
                            : "Liên hệ"}
                        </span>
                      )}

                      <div className=" ">
                        <span className=" text-xs underline underline-offset-2 text-[#0074BC]">
                          Xem chi tiết
                        </span>
                      </div>
                    </div>
                  </div>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Sheet
          visible={sheetVisible}
          onClose={() => setSheetVisible(false)}
          autoHeight
          mask
          handler
          swipeToClose
        >
          <Box >
            <div className=" px-6 py-2">
            <div className=" flex flex-col min-h-[400px]">
              <div className=" flex items-start">
                <span className=" text-sm w-[90px] text-slate-700 whitespace-nowrap">Mô tả vị trí :</span>
                <div className=" w-full flex flex-wrap max-h-[210px] overflow-y-scroll">
                  {sheetData?.moTaViTri?.map( (item, i) => (
                    <img className=" w-[100px] aspect-square " src={item} alt={`image${i}`} />
                  ) )}
                </div>
              </div>
              <div className=" flex items-start ">
                {!!sheetData.hinhDang && sheetData.hinhDang.length > 0 && <span className=" text-sm w-[90px] text-slate-700 whitespace-nowrap">Hình dáng :</span>}
                <div className=" w-full flex flex-wrap max-h-[210px] overflow-y-scroll">
                  {sheetData?.hinhDang?.map( (item, i) => (
                    <img className=" w-[100px] p-[6px] aspect-square " src={item} alt={`image${i}`} />
                  ) )}
                </div>
              </div>
              <div className=" flex items-start ">
                <span className=" text-sm w-[90px] text-slate-700 whitespace-nowrap">Lựa chọn :</span>
                <div className=" w-full flex flex-wrap max-h-[210px] overflow-y-scroll">
                {sheetData?.luaChon?.map( (item, i) => (
                    <img className=" w-[100px] p-[6px] aspect-square " src={item} alt={`image${i}`} />
                  ) )}
                </div>
              </div>
            </div>
            </div>
          </Box>
        </Sheet>
      </Box>
    );
  }
  return <></>;
};

const PassElevatorPage: FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  return (
    <Page className="flex flex-col ">
      <Header backgroundColor="#0068b2" textColor="white" title={productId} />
      <Suspense>
        <ProductTemplate productId={productId} />
      </Suspense>
    </Page>
  );
};

export default PassElevatorPage;
