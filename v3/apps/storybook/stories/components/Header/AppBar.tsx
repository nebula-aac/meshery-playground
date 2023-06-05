import { AppBar as MuiAppBar } from "@mui/material"

export const AppBar = ({ props, ...rest }) => {
    return <MuiAppBar {...props} {...rest} />
}