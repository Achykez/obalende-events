"use client"
import { StyledLayout } from "@/lib/styled-provider";
import StyledComponentsRegistry from "@/lib/styled-registry";
import AntDesignRegistry from "@/lib/antdRegistry";
import { ReduxProvider } from "@/redux";
import { antdTheme } from "@/theme/antdTheme";
import { ConfigProvider } from "antd";
import { FC, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { PageLoader } from "@/components/pageLoader/pageLoader";

export const AppProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <ReduxProvider>
        <StyledLayout>
          <AntDesignRegistry>
            <StyledComponentsRegistry>
              <ConfigProvider theme={antdTheme}>
                <Suspense  fallback={<PageLoader />}>{children}</Suspense>
              </ConfigProvider>
            </StyledComponentsRegistry>
          </AntDesignRegistry>
        </StyledLayout>
      </ReduxProvider>
    </AnimatePresence>
  );
};
