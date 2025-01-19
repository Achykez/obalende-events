"use client";

import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { GlobalStyles } from "@/theme/global-styles";
import { ToastContainer } from "react-toastify";
import { dTheme, lTheme } from "@/theme";
import { getCookie, setCookie } from "cookies-next";

export const StyledLayout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = getCookie("theme") || "light";
    setTheme(storedTheme)
    setCookie("theme",storedTheme);
  }, []);

    // const toggleTheme = () => {
    //   const newTheme = theme === 'light' ? 'dark' : 'light';
    //   setTheme(newTheme);
    //   localStorage.setItem('theme', newTheme);
    // };

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme === "light" ? lTheme : dTheme}>
          <GlobalStyles />
          <ToastContainer />

          {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
