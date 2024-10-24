import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import {
  categoriesState,
  productsByCategoryState,
  selectedCategoryIdState,
} from "state";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";

const subSection = [
  { id: "elite",
    lable: "ELITE",
    image: "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/eliteImage.png"
  },
  { id: "luxury",
    lable: "LUXURY",
    image: "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/luxuryImage.png"
  },
  { id: "premium",
    lable: "PREMIUM",
    image: "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/premiumImage.png"
  },
  { id: "panorama",
    lable: "PANORAMA",
    image: "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/panoramaImage.png"
  }
]

const CategoryPicker: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const selectedCategory = useRecoilValue(selectedCategoryIdState);
  return (
    <Tabs
      scrollable
      defaultActiveKey={selectedCategory}
      className="category-tabs"
    >
      {categories
        .filter((category) => category.type === "products")
        .map((category) => (
          <Tabs.Tab key={category.id} label={category.name}>
            <Suspense>
              <CategoryProducts categoryId={category.id} />
            </Suspense>
          </Tabs.Tab>
        ))}
    </Tabs>
  );
};

const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
  const navigate = useNavigate();
  const productsByCategory = useRecoilValue(
    productsByCategoryState(categoryId)
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
      {categoryId === "thangTaiKhach" ? (<>
        {subSection.map((product) => (
          <div onClick={() => navigate(`/elevator/${product.lable}`)}  key={product.id} className=" relative pb-2 flex flex-col items-center bg-white border-b-2 border-r border-slate-300 rounded-lg p-1 ">
          <div
            className="relative w-full aspect-[3/4] rounded-lg bg-cover bg-center bg-skeleton"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <span className="mt-2 text-sm font-semibold text-slate-700 ">{product.lable}</span>
          <span className=" text-xs text-[#0074BC] underline underline-offset-2">Xem chi tiết</span>
        </div>
        ))}
      </>) : (<>
        {productsByCategory.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      </>)}
    </Box>
  );
};

const CategoryPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header
        backgroundColor="#0068b2"
        textColor="white"
        title=" DANH MỤC SẢN PHẨM "
      />
      <CategoryPicker />
    </Page>
  );
};

export default CategoryPage;
