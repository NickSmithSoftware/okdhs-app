import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, TextInput, Platform, LogBox } from 'react-native';
import { Button, Input, Text, Icon} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FileSelector } from './components/file-selector';

import {validate} from './Validate';

// @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

import {initializeApp} from 'firebase/app';
import {getStorage, ref, uploadBytes} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDsU4BLy0CedXE6zQVLGgAufFQzudPTiaY",
  authDomain: "okdhs-app.firebaseapp.com",
  projectId: "okdhs-app",
  storageBucket: "okdhs-app.appspot.com",
  messagingSenderId: "70413447694",
  appId: "1:70413447694:web:2104b438cc874ceb39025f",
  measurementId: "G-LESXHTQNTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize MongoDB
const config = {
  
}

LogBox.ignoreLogs(['Setting a timer for a long period']);

const uploadFiles = async (images: ImageInfo[], social: string) => {
  let blobPromises: Promise<Blob>[] = [];
  const imageUri = (uri: string) : string => {
    //uri.replace('file://', '')
    return Platform.OS == "ios" ? uri : uri;
  }
  images.forEach((image) => {
    blobPromises.push(new Promise((resolve, reject) => {
      fetch(imageUri(image.uri)).then((response) => {
        resolve(response.blob());
      }).catch(reject);
    }))
  })

  let blobs: Blob[] = [];
  try {
    blobs = await Promise.all(blobPromises);
    const results = blobs.map((blob, index) => {
      const name = images[index].uri.substring(images[index].uri.lastIndexOf('/') + 1);
      let storageRef = ref(storage,  `${social}/${name}`);
      return uploadBytes(storageRef, blob).then().catch();
    });
    const final = await Promise.all(results);
    return final;
  } catch (err) {
  }
}

const defForm = {ssn: "", cn: "", cid: ""};

const App = () => {
  const [ssn, cn, cid] = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];
  const refs = [ssn, cn, cid];
  const [form, setForm] = useState(defForm);
  const [formValidity, setFormValidity] = useState([
    false, 
    false, 
    false
  ])
  const [submittable, setSubmittable] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [toUpload, setToUpload] = useState<ImageInfo[]>([]);

  // const [realm, setRealm] = useState<Realm>(null);

  useEffect(() => {
    // const init = async () => {
    //   return await Realm.open(config);
    // }

    // init().then((r) => setRealm(r)).catch();
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
            autoCompleteType="off"
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
            autoCompleteType="off"
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
            autoCompleteType="off"
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
              if(submittable) {
                uploadFiles(toUpload, form.ssn).then(() => {
                  //console.log("SUCCESS");
                  setToUpload([]);
                  setForm(defForm);
                }).catch(error => {
                  //console.log("ERROR");
                });
              }
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