import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { cartState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const CartContext: FC = () => {
  const cart = useRecoilValue(cartState);
  return (
    <Box className="bg-background">
      <div className="p-4">
        <span className="text-slate-600">Đang cập nhật...</span>
      </div>
    </Box>
  );
};

const CartPage: FC = () => {
  return (
    <Page>
      <Header title="Giỏ hàng" showBackIcon={false} textColor="white" backgroundColor="#0068b2" />
      <Divider />
      <CartContext />
    </Page>
  );
};

export default CartPage;
