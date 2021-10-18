import React, {useRef} from 'react';
import { View, Text, Button } from 'react-native';
import { CaseInput } from './components/CaseInput';
import { ClientIdInput } from './components/ClientIdInput';
import { SSNInput } from './components/SSNInput';

import {s} from './styles';

// @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

interface Form {
  ssn: string;
  cn: string;
  cid: string;
}

const App = () => {
  const formRef = useRef<Form>()
  return (
    <View style={s.layout}>

      <View>
        <Text style={s.h1Light}>OKDHS Live! Upload</Text>
        <Text style={s.h6Light}>2 of 3 forms of verification required*</Text>
      </View>

      <View>
        <Text style={s.h3Light}>Social Security Number</Text>
        <SSNInput ref={formRef.ssn} />

        <Text style={s.h3Light}>Case Number</Text>
        <CaseInput ref={formRef.cn} />

        <Text style={s.h3Light}>Client Id</Text>
        <ClientIdInput ref={formRef.cid} />
      </View>

      <View>
        <Button style={s.button} onPress={() => {
          
        }}>
          <Text style={{...s.h3Light, fontWeight: 'bold'}}>Select Files</Text>
        </Button>
      </View>

    </View>
  )
}

export default App;