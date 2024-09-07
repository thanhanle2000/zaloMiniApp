import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { productByIdState, productsByCategoryState } from "state";
import { Box, Header, Page, Tabs } from "zmp-ui";
import { useNavigate, useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { formatNumber } from "utils/utils";
import { PostItem } from "components/post";
import { Section } from "types/product";

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
  {
    id: "images",
    label: "Hình ảnh thực tế",
  },
  {
    id: "videos",
    label: "Video",
  },
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
          "Tải trọng : từ 320 kg – 2.000 kg",
          "Tốc độ    : từ 30 m/ph – 150 m/ph",
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
          "https://thangmayviettri.vn/wp-content/uploads/2020/07/thang-may-tai-khach-11.jpg",
        ],
      },
    ],
    spec: [
      {
        type: "image",
        content: [
          "https://thangmayviettri.vn/wp-content/uploads/2020/07/thong_so_thang_khach_1024_x_768.jpg",
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
    images: [
      {
        type: "space",
      },
    ],
    videos: [
      {
        type: "space",
      },
    ],
  },
};

const ProductTemplate: FC<{ productId: string | undefined }> = ({
  productId,
}) => {

  const productById = useRecoilValue(productByIdState(productId));
  const productsByCategory = useRecoilValue(
    productsByCategoryState(productById.categoryId),
  );
  const navigate = useNavigate();
  
  const gotoProduct = (productId: string) => {
    const url = `/category/${productId}`
    navigate(url);
  };
  if (productById) {
    return (
      <Box className=" px-6">
        <Box>
          <div>
            {productById.refImages ? (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                autoplay
                loop
              >
                {productById.refImages.map((image, i) => (
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
          <div className=" flex flex-col items-center space-y-1 py-2">
            <span className=" text-lg font-bold text-slate-800">
              {productById.name}
            </span>
            {productById.sale?.type === "percent" ? (
              <div className=" flex items-center space-x-2">
                <span className=" text-base text-slate-900 line-through">
                  {formatNumber(productById.price)}đ
                </span>
                <span className=" bg-red-600 text-white text-sm font-semibold p-[2px] rounded-md">
                  -
                  {productById.sale?.type === "percent"
                    ? productById.sale.percent * 100
                    : ""}
                  %
                </span>
              </div>
            ) : (
              <div></div>
            )}
            {productById.sale?.type === "percent" ? (
              <span className=" font-semibold text-xl text-[#0074BC] ">
                {formatNumber(
                  productById.price * (1 - productById.sale.percent)
                )}
                đ
              </span>
            ) : (
              <span className=" font-semibold text-xl text-[#0074BC] ">
                {formatNumber(productById.price)}đ
              </span>
            )}
            <div className=" bg-[#0074BC] w-full flex flex-col items-center rounded-md max-w-[240px] py-[6px]">
              <span className=" text-sm font-bold text-white ">
                LIÊN HỆ NGAY
              </span>
            </div>
          </div>
        </Box>
        <Box className=" flex flex-col py-6 border-t-2 border-slate-400 mt-6 text-slate-700">
          <div className=" flex items-start justify-center space-x-2">
            <span className=" w-[180px]">
              <strong>Mã sp:</strong> {productById.id}
            </span>
            <span className=" w-[180px]">
              <strong>Trần:</strong> {productById.info?.ceiling}
            </span>
          </div>
          <div className=" flex items-start justify-center space-x-2">
            <span className=" w-[180px]">
              <strong>Vách trước:</strong> {productById.info?.frontWall}
            </span>
            <span className=" w-[180px]">
              <strong>Vách sau:</strong> {productById.info?.backWall}
            </span>
          </div>
          <div className=" flex items-start justify-center space-x-2">
            <span className=" w-[180px]">
              <strong>Vách hông:</strong> {productById.info?.sideWall}
            </span>
            <span className=" w-[180px]">
              <strong>Tay vịn:</strong> {productById.info?.handrail}
            </span>
          </div>
          <div className=" flex items-start justify-center space-x-2">
            <span className=" w-[180px]">
              <strong>Cửa cabin:</strong> {productById.info?.cabinDoor}
            </span>
            <span className=" w-[180px]">
              <strong>Cửa tầng chính:</strong> {productById.info?.lobby}
            </span>
          </div>
          <div className=" flex items-start justify-center space-x-2">
            <span className=" w-[180px]">
              <strong>Cửa tầng khác:</strong> {productById.info?.floors}
            </span>
            <span className=" w-[180px]">
              <strong>Bao che:</strong> {productById.info?.gfnf}
            </span>
          </div>
          <div className=" flex items-start justify-center space-x-2">
            <span className=" w-[180px]">
              <strong>Sàn cabin:</strong> {productById.info?.cabinFloor}
            </span>
            <span className=" w-[180px]"></span>
          </div>
        </Box>
        <Tabs scrollable className="category-tabs">
          {techCategories.map((category) => (
            <Tabs.Tab key={category.id} label={category.label}>
              <Suspense>
                <div className=" bg-slate-50 px-4 py-4 content-center min-h-[200px]">
                  {productById.techInfo?.techSpec ? (
                    <PostItem sections={productById.techInfo?.techSpec} />
                  ) : (
                    <PostItem
                      sections={
                        defaultTechSpec[productById.categoryId][category.id]
                      }
                    />
                  )}
                </div>
              </Suspense>
            </Tabs.Tab>
          ))}
        </Tabs>
        <Box className=" bg-slate-50 py-6 px-4 flex flex-col items-center space-y-2">
          <span className=" font-semibold text-base text-[#0074BC]">
            Để được tư vấn thêm thông tin:
          </span>
          <div className=" bg-red-600 w-full max-w-[280px] flex flex-col items-center py-[6px] rounded-md">
            <span className=" font-bold text-white ">TƯ VẤN MIỄN PHÍ</span>
          </div>
        </Box>
        <Box className=" py-6 space-y-4 ">
          <div className=" flex items-center justify-between px-4">
            <span className=" text-lg font-bold text-slate-700">
              SẢN PHẨM CÙNG DANH MỤC
            </span>
            
          </div>
          <Swiper slidesPerView={2.25} spaceBetween={12} className="px-4">
            {productsByCategory.map((product) => (
              <SwiperSlide key={product.id}>
                <Box className=" w-full ">
      <div className=" relative w-full h-full  pb-4 flex flex-col items-center bg-white border-b border-r border-slate-300  rounded-lg  p-1 ">
        <div
          className="relative w-full aspect-square rounded-lg bg-cover bg-center bg-skeleton"
          style={{ backgroundImage: `url(${product.image})` }}
        />
        <div className=" flex flex-col min-h-[110px] h-full items-center justify-center">
        <span className=" mt-2 font-bold text-slate-700">{product.name}</span>
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
          <span className=" font-bold text-[#0074BC] ">
            {formatNumber(product.price * (1 - product.sale.percent))}đ
          </span>
        ) : (
          <span className=" font-bold text-[#0074BC] ">
            {formatNumber(product.price)}đ
          </span>
        )}

        <div className=" mt-1 bg-[#0074BC] px-2 py-[2px] rounded-lg">
          <span onClick={() => gotoProduct(product.id)} className=" text-xs font-semibold text-white">
            XEM CHI TIẾT
          </span>
        </div>
        </div>
      </div>
    </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    );
  }
  return <></>;
};

const ProductPage: FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  return (
    <Page className="flex flex-col ">
      <Header onBackClick={() => navigate('/')} backgroundColor="#0068b2" textColor="white" title={productId} />
      <Suspense>
        <ProductTemplate productId={productId} />
      </Suspense>
    </Page>
  );
};

export default ProductPage;
