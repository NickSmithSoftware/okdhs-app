import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import {s} from '../styles';

export const CaseInput = () => {
    const refs = Array(2).fill(useRef<TextInput>());
    const [lastIndexFocused, setLastIndexFocused] = useState(0);
    const [values, setValues] = useState(["", ""]);

    const maxLength = [1, 6];

    const inputs = refs.map((value, index) => {
        return (
            <TextInput
                key={index}
                style={{...s.ssDigitContainer, flex: maxLength[index]}} 
                keyboardType={"number-pad"}
                autoFocus={index == 0}
                maxLength={maxLength[index]}
                onFocus={() => {
                    setLastIndexFocused(index);
                }}
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
    });

    return (
        <View style={s.caseInputContainer}>
            {inputs}
        </View>
    )
}