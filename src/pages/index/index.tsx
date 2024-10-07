import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Categories } from "./categories";
import { VoucherBanner } from "./voucherBanner";
import { Deal } from "./deal";
import { ProductsCategory } from "./productsCategory";
import { Pattern } from "./pattern";
import { Catalogue } from "./catalogue";
import { News } from "./news";
import { Services } from "./services";
import { AboutUs } from "./aboutUs";
import { Footer } from "./footer";
import { Products } from "./products";
import { Projects } from "./projects";
import { Partners } from "./partners";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-gradient-to-r from-blue-300 from-10% via-sky-300 via-30% to-emerald-200 to-90% ">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        {/* <VoucherBanner /> */}

        <Suspense>
          <Categories />
        </Suspense>
        <Banner />
        <Products/>
        <Projects/>
        {/* <Deal /> */}
        <ProductsCategory />
        <Pattern />
        <Catalogue />
        <News />
        <Services />
        <AboutUs />
        <Partners/>
        <Footer />
      </Box>
    </Page>
  );
};

export default HomePage;
