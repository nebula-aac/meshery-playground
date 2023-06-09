import GoogleOpenSansFont from "@/app/fonts/fonts";
import { ThemeOptions, createTheme } from "@mui/material";

const defaultTheme = createTheme(
    {
        typography: {
            fontFamily: GoogleOpenSansFont.style.fontFamily,
            body1: { fontFamily: GoogleOpenSansFont.style.fontFamily },
            body2: { fontFamily: GoogleOpenSansFont.style.fontFamily }
        }
    },
    {} satisfies ThemeOptions
)

export default defaultTheme