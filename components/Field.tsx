import React from 'react';
import { s } from '../styles';

const Field = (ref?: any, size: number, placeholder: string, style?: {any}) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        if(ref) ref.current = value;
    }, [value])

    return (
        <TextInput
            style={{...s.ssDigitContainer, flex: (size ? size : 1), ...style }}
            keyboardType={"number-pad"}
            maxLength={size}
            selectTextOnFocus={true}
            onChangeText={(text) => {
                setValue(text);
            }}
            value={value}
            ref={ref}
        />
    )
}

export default Field;