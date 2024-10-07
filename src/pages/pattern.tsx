import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import {
  patternsByCategoryState,
  patternsState,
  productsByCategoryState,
  selectedPatternIdState,
} from "state";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";

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
  const patternsByCategory = useRecoilValue(
    patternsByCategoryState(categoryId),
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
  return (
    <Box className="bg-[#e0e7ec] grid grid-cols-2 gap-4 p-4">
      {patternsByCategory.map((pattern) => (
        <div key={pattern.id} className=" flex justify-center items-center ">
          <div className=" flex flex-col items-center justify-center bg-white shadow-lg rounded-md">
          <img className=" w-[150px] object-contain rounded-t-md " loading="lazy" src={pattern.image} alt={pattern.name} />
          <span className=" py-2 font-semibold text-slate-600">{pattern.name}</span>
          </div>
          
        </div>
      ))}
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
