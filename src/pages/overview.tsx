import { PostItem } from "components/post";
import React, { Suspense } from "react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { dataByTypeState } from "state";
import { Page, Header, Box, Text } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { convertTimestamp } from "utils/utils";
import { openWebview } from "zmp-sdk/apis";

const lable = {
  products: "SẢN PHẨM NỔI BẬT",
  deal: "DEAL SẮP DIỄN RA",
  catalogue: "CATALOGUE",
  news: "TIN TỨC",
  services: "DỊCH VỤ CỦA VIỆT TRÍ",
  aboutUs: "VỀ CHÚNG TÔI",
  projects: "DỰ ÁN TIÊU BIỂU",
};

export const OverviewPage: FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const data = useRecoilValue(dataByTypeState(type));
  const gotoPost = (postId: string) => {
    const url = `/posts/${postId}`;
    navigate(url);
  };

  const handleClick = async (id: string) => {
    // const url = `https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/${id}.pdf`;
    // try {
    //   await openWebview({
    //     url: url,
    //   });
    // } catch (error) {
    //   console.error("Failed to open location:", error);
    // }
    navigate(`/pdfViewer/${id}`)
  };

  return (
    <Page className="flex flex-col ">
      <Header
        backgroundColor="#0068b2"
        textColor="white"
        title={!!type ? lable[type] : ""}
      />
      <Suspense>
        <div className="">
          {type === "products" ? (
            <>
              {data.length === 0 ? (
                <>
                  <Box className="flex-1 p-4 flex justify-center items-center">
                    <Text size="xSmall" className="text-gray">
                      Không có sản phẩm trong danh mục
                    </Text>
                  </Box>
                </>
              ) : (
                <>
                  <Box className="bg-[#e0e7ec] grid grid-cols-2 gap-4 p-4">
                    {data.map((product) => (
                      <ProductItem key={product.id} product={product} />
                    ))}
                  </Box>
                </>
              )}
            </>
          ) : type === "catalogue" ? (
            <>
              <div className=" grid grid-cols-2 gap-x-2 gap-y-4 px-4 py-8">
                {data.map((category) => (
                  <div
                    key={category.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(category.id);
                    }}
                    className=" relative w-full flex flex-col items-center bg-white border-b border-r border-slate-300  rounded-lg  p-1 "
                  >
                    <div
                      className="relative w-full aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                      style={{
                        backgroundImage: `url(${category.catalogImage})`,
                      }}
                    />
                    <div className=" flex w-full mt-1 px-4 items-center justify-between">
                      <div className=" hover:bg-slate-100 px-2 ">
                        <span className=" text-sm text-[#0074BC] underline underline-offset-2">
                          XEM
                        </span>
                      </div>
                      <div className=" hover:bg-slate-100 px-2 ">
                        {/* <img
                          className=" h-[22px] aspect-square"
                          src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/downloadIcon.png"
                          alt={`${category.id}download`}
                        /> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                className={`${
                  type === "aboutUs"
                    ? "flex flex-col items-center space-y-2"
                    : type === "services"
                    ? "flex flex-col items-center space-y-2"
                    : "grid grid-cols-2 gap-x-2 gap-y-4"
                } px-2 py-8`}
              >
                {data.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => gotoPost(post.id)}
                    className=" relative flex flex-col bg-white border-b-2 border-r border-slate-300  rounded-lg  p-1 "
                  >
                    <div
                      className={`${
                        type === "aboutUs"
                          ? " min-w-[260px]"
                          : type === "services"
                          ? "min-w-[260px]"
                          : "w-full"
                      } aspect-video rounded-lg bg-cover bg-center bg-skeleton`}
                      style={{ backgroundImage: `url(${post.thumbnail})` }}
                    />
                    {type === "news" ? (
                      <>
                        <div className=" flex flex-col px-1 mt-2">
                          <span className=" text-start text-sm font-bold text-slate-700 ">
                            {post.title}
                          </span>
                          <span className=" text-slate-500 text-sm ">
                            {convertTimestamp(post.createdAt)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className=" flex flex-col px-1 mt-2 items-center">
                          <span className=" text-center text-sm font-bold text-slate-700 ">
                            {post.title}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Suspense>
    </Page>
  );
};
