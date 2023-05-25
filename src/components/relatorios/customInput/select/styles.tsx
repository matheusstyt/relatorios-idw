import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    styled as styledMui,
} from "@mui/material";

export const SelectMUI = styledMui(Select)<any>(
    ({ styled_theme, color_mode, value }) => ({
        "&&": {
            border: "none",
            color:
                color_mode === "1"
                    ? styled_theme.colors.background.default
                    : "",

            //fontWeight: color_mode && "bold",
        },

        "&&& .MuiFilledInput-input": {
            paddingTop: ({ size }: any) => size === "small" && "10px",
        },
        "&&& .MuiOutlinedInput-input": {
            color: "#FFFFFF",
            fontSize: "30px",
            marginTop: 20,
        },
        "&&& 	.MuiOutlinedInput-notchedOutline": {
            border: "none",
        },
        "&&& .MuiFilledInput-root:before": {
            border: "none",
        },
    })
);

export const InputControl = styledMui(FormControl)<any>(
    ({ size, no_padding_top, flex, width, minWidth }: any) => ({
        ...(width
            ? {
                  width: width ? width : "auto",
              }
            : {
                  flex: flex ? flex : "auto",
              }),

        minWidth: minWidth ? minWidth : "auto",

        paddingTop:
            size === "small" && no_padding_top === "false" ? "10px" : "0px",

        "&&& .MuiInputBase-root:before": {
            border: "none",
            flex: 1,
        },

        "&&& .MuiFormControl-root": {
            paddingTop: "0px",
        },
    })
);

export const Option = styledMui(MenuItem)<any>(
    ({ styled_theme, color_mode, _value }: any) => ({
        "&&": {
            color: () => {
                if (color_mode) {
                    if (_value === 1) return styled_theme.colors.success.main;
                    if (_value === 2) return styled_theme.colors.error.main;
                }
            },
        },
    })
);

export const HelperText = styledMui(FormHelperText)<any>(
    ({ styled_theme, error }) => ({
        color: error
            ? styled_theme.colors.error.main
            : styled_theme.colors.text.main,

        textAlign: "start",
        margin: "0px 0px 0px 3px",
        overflow: "hidden !important",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    })
);
