import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Input, Text, Icon} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FileSelector } from './components/file-selector';

import {validate} from './Validate';

//import {Storage} from '@google-cloud/storage'

// @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

// const uploadDocuments = async (images: ImageInfo[]) => {
//   const storage = new Storage({keyFilename: 'thingy.json'});
//   const bucket = storage.bucket('okdhs-app');
//   return await Promise.all(images.map((image) => {
//     bucket.upload(image.uri, {resumable: false})
//   }));
// }

const App = () => {
  const [ssn, cn, cid] = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];
  const refs = [ssn, cn, cid];
  const [form, setForm] = useState({
    ssn: "",
    cn: "",
    cid: ""
  })
  const [formValidity, setFormValidity] = useState([
    false, 
    false, 
    false
  ])
  const [submittable, setSubmittable] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [toUpload, setToUpload] = useState<ImageInfo[]>([]);

  useEffect(() => {
  
  }, [])

  const maxLengths = [9, 7, 9];
  const [ssnMax, cnMax, cidMax] = maxLengths;

  useEffect(() => {
    setFormValidity(Object.entries(form).map((entry: [string, string]) => validate(entry)));
  }, [form]);

  useEffect(() => {
    let numValid = 0;
    formValidity.forEach((value) => {if(value) numValid++});
    setSubmittable(numValid >= 2);
  }, [formValidity])
  
  return (
    <SafeAreaProvider>
      <View style={styles.layout}>

        <Text h1>OKDHS Live! App </Text>

        <View style={styles.view}>
          <Text style={styles.mainWarning}>2 of 3 required</Text>
          <Input
            placeholder="Social Security Number"
            secureTextEntry
            maxLength={ssnMax}
            style={styles.input}
            rightIcon={
              <Icon
                name="visibility"
                size={24}
                color='grey'
                tvParallaxProperties={undefined}
              />
            }
            onChangeText={(text: string) => {
              setForm({
                  ...form,
                  ssn: text
              });
            }}
            ref={ssn}
            
          />
          <Input
            placeholder="Case Number"
            secureTextEntry
            maxLength={cnMax}
            style={styles.input}
            rightIcon={
              <Icon
                name="visibility"
                size={24}
                color='grey'
                tvParallaxProperties={undefined}
              />
            }
            onChangeText={(text: string) => {
              setForm({
                  ...form,
                  cn: text
              });
            }}
            ref={cn}
          />
          <Input
            placeholder="Case ID Number"
            secureTextEntry
            maxLength={cidMax}
            style={styles.input}
            rightIcon={
              <Icon
                name="visibility"
                size={24}
                color='grey'
                tvParallaxProperties={undefined}
              />
            }
            onChangeText={(text: string) => {
              setForm({
                  ...form,
                  cid: text
              });
            }}
            ref={cid}
          />
        </View>

        <View style={styles.view}>
          <Button
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            title="Select Files" 
            type="solid" 
            icon={
              <Icon
                name="folder"
                size={24}
                color='white' 
                tvParallaxProperties={undefined}
              />}
            iconRight
            raised
            titleStyle={styles.buttonText}
            onPress={() => {
              setOverlayVisible(true);
            }}
          />
          { toUpload.length > 0 ?
          <Button
            buttonStyle={{...styles.buttonStyle, backgroundColor: 'green'}}
            containerStyle={styles.buttonContainer}
            title="Upload Documents"
            type="solid"
            raised
            titleStyle={styles.buttonText}
            onPress={() => {
              /*uploadDocuments(toUpload).then((response) => {
                console.log(response);
                setToUpload([]);
              }).catch((error) => {
                console.error(error);
              }).finally(() => {

              })*/
            }}
          />
            :
          <Button
            buttonStyle={{...styles.buttonStyle, backgroundColor: 'green'}}
            containerStyle={styles.buttonContainer}
            title="Upload Documents"
            type="solid"
            raised
            titleStyle={styles.buttonText}
            disabled
          />
          }
        </View>

        <FileSelector 
          buttonStyle={styles.buttonStyle}
          buttonContainer={styles.buttonContainer}
          titleStyle={styles.buttonText}
          isVisible={overlayVisible} 
          setIsVisible={setOverlayVisible} 
          setToUpload={setToUpload}
          />
        </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '75%',
    borderRadius: 35,
    marginVertical: 10
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'space-evenly',
    borderRadius: 35,
    paddingVertical: 15
  },
  buttonText: {
    fontSize: 20,

  },
  input: {
    fontSize: 20,
    marginVertical: 5,
    textAlign: 'center',
  },
  inputValid: {
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'green'
  },
  layout: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  mainWarning: {
    color: 'red',
    fontSize: 20,
    marginBottom: 15,
    fontStyle: 'italic',
    fontWeight: '100',
    
  },
  view: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default App;