import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text, ThemeProvider } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {filestack} from 'filestack-react';

// @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

const App = () => {
  const client = useRef();
  const [form, setForm] = useState({
    ssn: "",
    cn: "",
    cid: ""
  })

  useEffect(() => {
    const apiKey = 'APIKEY';
    client.current = filestack.init(apiKey);
    const onProgress = (e) => {
      doSomething();
    };

    document.querySelector('input').addEventListener('change', (event) => {
      const files = event.target.files[0];
      const token = {};
      const cancel = document.getElementById('cancel');
      const pause = document.getElementById('pause');
      const resume = document.getElementById('resume');
  
      [cancel, resume, pause].forEach((btn) => {
        const id = btn.id;
        btn.addEventListener('click', () => {
          token[id]();
        });
      });
  
      client.upload(files, { onProgress }, {}, token)
        .then(res => {
          console.log('success: ', res)
        })
        .catch(err => {
          console.log(err)
        });
    });
  });
  
  }, [])

  return (
    <SafeAreaProvider>
      <View style={styles.layout}>

        <Text h1>OKDHS Live! App </Text>

        <View style={styles.view}>
          <Text style={styles.mainWarning}>2 of 3 required</Text>
          <Input
            placeholder="Social Security Number"
            secureTextEntry
            maxLength={9}
            style={styles.input}
            rightIcon={
              <Icon
                name="visibility"
                size={24}
                color='grey'
              />
            }
          />
          <Input
            placeholder="Case Number"
            secureTextEntry
            maxLength={7}
            style={styles.input}
            rightIcon={
              <Icon
                name="visibility"
                size={24}
                color='grey'
              />
            }
          />
          <Input
            placeholder="Case ID Number"
            secureTextEntry
            maxLength={9}
            style={styles.input}
            rightIcon={
              <Icon
                name="visibility"
                size={24}
                color='grey'
              />
            }
          />
        </View>

        <View style={styles.view}>
          <Button
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            title="Upload Picture" 
            type="solid" 
            icon={
              <Icon
                name="photo-camera"
                size={24}
                color='white'
              />}
            iconRight
            raised
            titleStyle={styles.buttonText}
          />
        </View>

        </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '75%',
    borderRadius: 35,
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontSize: 20,

  },
  input: {
    fontSize: 20,
    marginVertical: 5,
    textAlign: 'center',
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