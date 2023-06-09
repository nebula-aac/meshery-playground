'use client'

import React from "react";
import CssBaseline from "@mui/material/CssBaseline"
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { ThemeProvider } from "@mui/material";
import theme from "./theme"

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <CssBaseline />
            <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </NextAppDirEmotionCacheProvider>
        </React.Fragment>
    )
}