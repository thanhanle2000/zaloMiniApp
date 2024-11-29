import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import HomePage from "pages/index";
import CategoryPage from "pages/category";
import NotificationPage from "pages/notification";
import ProfilePage from "../pages/profile";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import { useHandlePayment } from "hooks";
import ProductPage from "pages/product";
import { PostPage } from "pages/post";
import PatternPage from "pages/pattern";
import { OverviewPage } from "pages/overview";
import { EventsPage } from "pages/events";
import { CaiTaoThangMayPage } from "pages/caiTaoThangMay";
import { Contact } from "./contact";
import BookingPage from "pages/booking";
import PassElevatorPage from "pages/passElevator";
import { PdfViewerPage } from "pages/pdfViewer";

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
      window.devicePixelRatio,
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`,
  );
}

export const Layout: FC = () => {
  useHandlePayment();

  return (
    <Box flex flexDirection="column" className=" h-screen">
      <ScrollRestoration />
      <Box className="relative flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/category/:productId" element={<ProductPage/>}></Route>
          <Route path="/notification" element={<NotificationPage />}></Route>
          <Route path="/booking" element={<BookingPage />}></Route>
          <Route path="/posts/:postId" element={<PostPage />} ></Route>
          <Route path="/pdfViewer/:postId" element={<PdfViewerPage />} ></Route>
          <Route path="/overview/:type" element={<OverviewPage />}></Route>
          <Route path="/elevator/:productId" element={<PassElevatorPage />}></Route>
          <Route path="/events" element={<EventsPage/>}></Route>
          <Route path="/caiTaoThangMay" element={<CaiTaoThangMayPage/>}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/pattern" element={<PatternPage />}></Route>
        </Routes>
        <Contact/>
      </Box>
      <Navigation />
    </Box>
  );
};
