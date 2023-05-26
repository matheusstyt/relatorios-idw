import { Calendar } from "react-feather";

import { TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

dayjs.locale("pt-br");

function DateInput({
    value,
    onChangeValue,
    label,
    error,
    helperText,
    useWidth,
    disabled,
    minDate,
}: any) {
    // const [value, setValue] = useState<Dayjs | null>(null);

    const onKeyDown = (e: any) => {
        e.preventDefault();
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} locale="pt-br">
            <DesktopDatePicker
                label={label}
                value={value}
                minDate={minDate}
                onChange={(newValue) =>
                    onChangeValue && onChangeValue(newValue)
                }
                components={{
                    OpenPickerIcon: Calendar,
                }}
                disabled={disabled}
                renderInput={(params) => (
                    <TextField
                        variant="filled"
                        {...params}
                         style={{ width: useWidth }}
                        onKeyDown={onKeyDown}
                        sx={{
                            svg: { color: "#8A94AD" },
                            color: "#000000DE",
                            "& label.Mui-focused": {
                                color: "#2E6DE3",
                            },
                            "& label.Mui-focused:hover": {
                                color: "#2E6DE3",
                            },
                            "& .MuiInputBase-root:after": {
                                borderBottomColor: "#2E6DE3",
                            },
                            "& .MuiInputBase-root:before": {
                                border: "#2E6DE3",
                            },
                            "& .MuiInputBase-root:hover": {
                                border: "#2E6DE3",
                            },
                            "& .MuiFormLabel-root.Mui-error": {
                                color: "#b00020",
                            },
                            "& .MuiInputBase-root.Mui-error:after": {
                                borderBottomColor: "#b00020",
                            },
                            "&&& .MuiFilledInput-root:before": {
                                border: 0,
                            },
                        }}
                        error={error}
                        helperText={error && helperText}
                        disabled={disabled}
                    />
                )}
            />
        </LocalizationProvider>
    );
}

export default DateInput;
