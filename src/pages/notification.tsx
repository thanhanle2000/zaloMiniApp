import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { notificationsState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const NotificationList: FC = () => {
  const notifications = useRecoilValue(notificationsState);
  return (
    <Box className="bg-background">
      <div className="p-4">
        <span className="text-slate-600">Đang cập nhật...</span>
      </div>
    </Box>
  );
};

const NotificationPage: FC = () => {
  return (
    <Page>
      <Header title="Thông báo" showBackIcon={false} textColor="white" backgroundColor="#0068b2" />
      <Divider />
      <NotificationList />
    </Page>
  );
};

export default NotificationPage;
