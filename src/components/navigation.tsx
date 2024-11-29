import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { openChat, openWebview } from "zmp-sdk/apis";
import { CartIcon } from "./cart-icon";
import { useRecoilValue } from "recoil";
import { userInfoState } from "state";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/booking": {
    label: "Đặt lịch",
    icon: <Icon icon="zi-calendar" />,
  },
  "/messeger": {
    label: "Liên hệ",
    icon: <Icon icon="zi-chat" />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  const user = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = async (path: string) => {
    if (path.includes("messeger")) {
      try {
        if(!!user.id) {
          await openChat({
            type: "oa",
            id: "3022539273724394240", // Your OA ID
            message: "Xin chào", // Optional initial message
          });
        } else {
          await openWebview({
            url: "https://zalo.me/viettriofficial",
          });
        }
      } catch (error) {
        console.error("Failed to open chat:", error);
      }
    } else {
      navigate(path);
    }
  };

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);
  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={activeTab}
      onChange={(key: TabKeys) => setActiveTab(key)}
      className="z-[99999]"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
          onClick={() => handleClick(path)}
        />
      ))}
    </BottomNavigation>
  );
};
