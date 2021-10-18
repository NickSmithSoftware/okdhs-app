import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import {s} from '../styles';

export const SSNInput = () => {
    const refs = Array(3).fill(useRef<TextInput>());
    const [values, setValues] = useState(["", "", ""]);
    const [lastIndexFocused, setLastIndexFocused] = useState(0);

    const maxLength = [3, 2, 4];

    useEffect(() => {
        if (values[lastIndexFocused].length >= maxLength[lastIndexFocused] && lastIndexFocused <= 2) {
            setLastIndexFocused(lastIndexFocused+1);
        }
    }, [values])

    useEffect(() => {
        refs[lastIndexFocused].current.focus();
    }, [lastIndexFocused])

    let inputs = refs.map((value, index) => {
        return (
                <TextInput
                    key={index}
                    style={{...s.ssDigitContainer, flex: maxLength[index]}} 
                    keyboardType={"number-pad"}
                    maxLength={maxLength[index]}
                    selectTextOnFocus={true}
                    onChangeText={(text) => {
                        let temporaryArray = [...values];
                        temporaryArray[index] = text;
                        setValues(temporaryArray)
                    }}
                    value={values[index]}
                    ref={value}
                />
        )
    })

    return (
        <View style={s.ssInputContainer}>
            {inputs}
        </View>
    )
}