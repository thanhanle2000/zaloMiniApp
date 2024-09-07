import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import {
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
            <CategoryProducts categoryId={pattern.lable} />
          </Suspense>
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
  const productsByCategory = useRecoilValue(
    productsByCategoryState(categoryId),
  );

  if (productsByCategory.length === 0) {
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
      {productsByCategory.map((product) => (
        <ProductItem key={product.id} product={product} />
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
