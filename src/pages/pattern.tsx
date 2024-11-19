import { ProductItem } from "components/product/item";
import React, { FC, Suspense, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  patternsByCategoryState,
  patternsState,
  productsByCategoryState,
  selectedPatternIdState,
} from "state";
import { PatternItem } from "types/product";
import { Box, Header, Page, Sheet, Tabs, Text } from "zmp-ui";

const CategoryPicker: FC = () => {
  const patterns = useRecoilValue(patternsState);
  const selectedPattern = useRecoilValue(selectedPatternIdState);
  return (
    <Tabs
      scrollable
      defaultActiveKey={selectedPattern}
      className="category-tabs"
    >
      {patterns.map((pattern) => (
        <Tabs.Tab key={pattern.id} label={pattern.lable}>
          <Suspense>
            <CategoryPattern categoryId={pattern.id} />
          </Suspense>
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

const CategoryPattern: FC<{ categoryId: string }> = ({ categoryId }) => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [sheetData, setSheetData] = useState<PatternItem | undefined>(undefined);
  const patternsByCategory = useRecoilValue(
    patternsByCategoryState(categoryId)
  );
  if (patternsByCategory.length === 0) {
    return (
      <Box className="flex-1 bg-background p-4 flex justify-center items-center">
        <Text size="xSmall" className="text-gray">
          Không có sản phẩm trong danh mục
        </Text>
      </Box>
    );
  }

  const handleClick = (itemId: string) => {
    if (!!itemId) {
      const sheetDataMount = patternsByCategory.find((pattern) => pattern.id === itemId);
      setSheetData(sheetDataMount);
    }
    setSheetVisible(true);
  };
  return (
    <Box>
      {categoryId === "cuaTang" ? (
        <Box className="flex flex-col items-center gap-4 py-4">
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              BAO CHE BẢN HẸP
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "baoCheBanHep")
                .map((pattern) => (
                  <div
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              BAO CHE BẢN RỘNG KHÔNG HIỂN THỊ
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "baoCheBanRongKHT")
                .map((pattern) => (
                  <div
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              BAO CHE BẢN RỘNG CÓ HIỂN THỊ
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "baoCheBanRongCHT")
                .map((pattern) => (
                  <div
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Box>
      ) : categoryId === "sanCabin" ? (
        <Box className="flex flex-col items-center gap-4 py-4">
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              SÀN GRANITE
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "sanGranite")
                .map((pattern) => (
                  <div
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              SÀN TOLE GÂN
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "sanToleGan")
                .map((pattern) => (
                  <div
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              SÀN INOX
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "sanInox")
                .map((pattern) => (
                  <div
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Box>
      ) : categoryId === "cabin" ? (
        <Box className="flex flex-col items-center gap-4 py-4">
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              THANG TẢI KHÁCH
            </span>
            <Box className="flex w-full justify-center items-start gap-4">
              <div className="flex flex-col items-center ">
                <span className=" mt-2 text-slate-700">TIÊU CHUẨN</span>
                <div className=" grid grid-cols-1 mt-2 gap-4 w-full">
                  {patternsByCategory
                    .filter((pattern) => pattern.subId === "cabinTieuChuanP")
                    .map((pattern) => (
                      <div
                        onClick={() => handleClick(pattern.id)}
                        key={pattern.id}
                        className=" flex justify-center items-center "
                      >
                        <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                          <img
                            className=" w-[150px] object-contain rounded-t-md "
                            loading="lazy"
                            src={pattern.image}
                            alt={pattern.name}
                          />
                          <span className=" py-2 font-semibold text-slate-600">
                            {pattern.name}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex flex-col items-center ">
                <span className=" mt-2 text-slate-700">TUỲ CHỌN</span>
                <div className=" mt-2 grid grid-cols-1 gap-4 w-full">
                  {patternsByCategory
                    .filter((pattern) => pattern.subId === "cabinTuyChonP")
                    .map((pattern) => (
                      <div
                        onClick={() => handleClick(pattern.id)}
                        key={pattern.id}
                        className=" flex justify-center items-center "
                      >
                        <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                          <img
                            className=" w-[150px] object-contain rounded-t-md "
                            loading="lazy"
                            src={pattern.image}
                            alt={pattern.name}
                          />
                          <span className=" py-2 font-semibold text-slate-600">
                            {pattern.name}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Box>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              THANG QUAN SÁT
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "cabinO")
                .map((pattern) => (
                  <div
                    onClick={() => handleClick(pattern.id)}
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              THANG TẢI Ô TÔ
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "cabinC")
                .map((pattern) => (
                  <div
                    onClick={() => handleClick(pattern.id)}
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              THANG TẢI HÀNG
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "cabinF")
                .map((pattern) => (
                  <div
                    onClick={() => handleClick(pattern.id)}
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              THANG THỰC PHẨM
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "cabinD")
                .map((pattern) => (
                  <div
                  onClick={() => handleClick(pattern.id)}
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span className=" mt-2 text-[#0068b2] font-semibold text-center">
              THANG TẢI GIƯỜNG BỆNH
            </span>
            <div className=" grid grid-cols-2 gap-4 w-full">
              {patternsByCategory
                .filter((pattern) => pattern.subId === "cabinH")
                .map((pattern) => (
                  <div
                    onClick={() => handleClick(pattern.id)}
                    key={pattern.id}
                    className=" flex justify-center items-center "
                  >
                    <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                      <img
                        className=" w-[150px] object-contain rounded-t-md "
                        loading="lazy"
                        src={pattern.image}
                        alt={pattern.name}
                      />
                      <span className=" py-2 font-semibold text-slate-600">
                        {pattern.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Box>
      ) : (
        <Box className="bg-[#e0e7ec] grid grid-cols-2 gap-4 p-4">
          {patternsByCategory.map((pattern) => (
            <div
              key={pattern.id}
              className=" flex justify-center items-center "
            >
              <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
                <img
                  className=" w-[150px] object-contain rounded-t-md "
                  loading="lazy"
                  src={pattern.image}
                  alt={pattern.name}
                />
                <span className=" py-2 font-semibold text-slate-600">
                  {pattern.name}
                </span>
              </div>
            </div>
          ))}
        </Box>
      )}
      <Sheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <Box>
        <Box className=" flex flex-col pt-4 pb-14 px-4 space-y-2 text-slate-700">
          {!!sheetData?.id && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Mã sản phẩm
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.id}
              </span>
            </div>
          )}
          {!!sheetData?.info?.lobby && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Cửa tầng chính
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.lobby}
              </span>
            </div>
          )}
          {!!sheetData?.info?.floors && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Cửa tầng khác
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.floors}
              </span>
            </div>
          )}
          {!!sheetData?.info?.cabinDoor && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Cửa cabin
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.cabinDoor}
              </span>
            </div>
          )}
          {!!sheetData?.info?.gfnf && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Bao che
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC]">
                {sheetData?.info?.gfnf}
              </span>
            </div>
          )}
          {!!sheetData?.info?.ceiling && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Trần
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.ceiling}
              </span>
            </div>
          )}
          {!!sheetData?.info?.cabinFloor && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Sàn cabin
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.cabinFloor}
              </span>
            </div>
          )}
          {!!sheetData?.info?.frontWall && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Vách trước
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.frontWall}
              </span>
            </div>
          )}
          {!!sheetData?.info?.backWall && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Vách sau
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.backWall}
              </span>
            </div>
          )}
          {!!sheetData?.info?.sideWall && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  Vách hông
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.sideWall}
              </span>
            </div>
          )}
          {!!sheetData?.info?.handrail && (
            <div className=" flex items-start space-x-2 justify-start ">
              <div className=" flex items-center justify-between w-[100px] ">
                <span className=" text-sm text-slate-600 whitespace-nowrap">
                  {sheetData?.subId?.includes("P")
                    ? "Nẹp bảo vệ"
                    : "Tay vịn"}
                </span>
                <span>:</span>
              </div>
              <span className=" text-sm font-semibold text-[#0074BC] ">
                {sheetData?.info?.handrail}
              </span>
            </div>
          )}
        </Box>
        </Box>
      </Sheet>
    </Box>
  );
};

const PatternPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header backgroundColor="#0068b2" textColor="white" title=" MẪU MÃ " />
      <CategoryPicker />
    </Page>
  );
};

export default PatternPage;
