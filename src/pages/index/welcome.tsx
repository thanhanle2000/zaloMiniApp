import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "state";
import logo from "static/logo.png";
import appConfig from "../../../app-config.json";
import { getConfig } from "utils/config";

export const Welcome: FC = () => {
  //const user = useRecoilValueLoadable(userState);
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px] shadow-md "
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <img
              className="h-[40px] object-contain bg-white rounded-sm"
              src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/logoVietTriPNG-300x68.png"
              // src={getConfig((c) => c.template.headerLogo) || logo}
            />
            {/* <Box>
              <Text.Title size="small">{appConfig.app.title}</Text.Title>
              {user.state === "hasValue" ? (
                <Text size="xxSmall" className="text-gray">
                  Welcome, {user.contents.name}!
                </Text>
              ) : (
                <Text>...</Text>
              )}
            </Box> */}
          </Box>
        ) as unknown as string
      }
    />
  );
};
