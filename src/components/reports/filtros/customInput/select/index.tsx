import { InputLabel } from "@mui/material";
import { HelperText, InputControl, Option, SelectMUI } from "./styles";
function SelectIDW({
    id,
    options,
    label,
    onChange,
    value,
    fullWidth,
    width,
    flex,
    colorMode,
    data,
    shrink,
    size,
    variant,
    readOnly,
    noPaddingTop,
    name,
    error,
    helperText,
    minWidth,
    ...rest
}: any) {

    const disableOptions = (option: any, _value: any) => {
        let isSelected = false;

        data?.map((item: any) => {
            if (item.shiftweek === _value) {
                isSelected = true;
            }
        });
        return isSelected || option?.value === 999;
    };

    const ITEM_HEIGHT = 48;

    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 300,
            },
        },
    };

    return (
        <InputControl
            fullWidth={fullWidth}
            // flex={flex}
            variant={variant ? variant : "filled"}
            size={size}
            width={width}
    
            no_padding_top={noPaddingTop?.toString()}
        >
            <InputLabel error={error} id={id} shrink={shrink}>
                {label}
            </InputLabel>

            <SelectMUI
                readOnly={readOnly ? readOnly : false}
                id={id}
                labelId={id}
                value={value !== null ? value : ""}
                onChange={onChange}
                color_mode={colorMode}
                notched={"true"}
                size={size}
                name={name}
                error={error}
                
                {...rest}
                MenuProps={MenuProps}
                
            >
                {options?.map((option: any, index: number) => (
                    <Option
                        
                        key={`${index} - ${option?.value}`}
                        value={option?.value}
                        _value={option?.value}
                        color_mode={colorMode}
                        disabled={disableOptions(option, option.value)}
                        
                    >
                        {option?.name}
                    </Option>
                ))}
            </SelectMUI>
            {error ? (
                <HelperText  error={error}>
                    {helperText}
                </HelperText>
            ) : null}
        </InputControl>
    );
}
export default SelectIDW;
