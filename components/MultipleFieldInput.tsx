import React from 'react';
import {View} from 'react-native';

const MultipleFieldInput = (setState: (fields: string[]) => any, maxLength: number[], placeholders?: string[], onChange?: (values: string[]) => void) => {
    const [fieldValues, setFieldValues] = useState<string[]>()
    const fieldRefs = Array(maxLength.length).fill(useRef());
    
    const fields = maxLength.map((value, i) => {
        <Field 
            ref={fieldRefs[i]} 
            size={value} 
            placeholder={placeholders ? placeholders[i] ? placeholders[i] : "" : ""} 
        />
    })

    fieldRefs.forEach((ref, i) => {
        useEffect(() => {
            setFieldValues([...fieldValues].splice(i, 1, ref.current))
        }, [ref.current])
    })

    useEffect(() => {
        onChange(fieldValues);
    }, [fieldValues])

  
    return (
    <View>

    </View>
  )
}

export default MultipleFieldInput;