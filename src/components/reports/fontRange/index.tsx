import { useState } from "react";

const FontRange = (props: any) => {
    const [rangeValue, setRangeValue] = useState(14); // valor do input de range inicial
    const handleFontSizeChange = (e: any) => {
        const newSize = parseInt(e.target.value);
        setRangeValue(newSize);
        props.changed(newSize);
    };
    return (
        <div className='input-field'>
            <label htmlFor="font-size">Tamanho da fonte</label>
            <input
                id='font-size'
                type="range"
                min="6"
                max="24"
                value={rangeValue}

                onChange={(e: any) => {
                    setRangeValue(parseInt(e.target.value));
                    props.changed(parseInt(e.target.value));
                }
                }
            />
        </div>
)
}
export default FontRange;
