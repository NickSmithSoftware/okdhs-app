import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CaseInput } from './components/CaseInput';
import { ClientIdInput } from './components/ClientIdInput';
import { SSNInput } from './components/SSNInput';

import {s} from './styles';

// @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

const App = () => {
  return (
    <View style={s.layout}>

      <View>
        <Text style={s.h1Light}>OKDHS Live! Upload</Text>
        <Text style={s.h6Light}>2 of 3 forms of verification required*</Text>
      </View>

      <View>
        <Text style={s.h3Light}>Social Security Number</Text>
        <SSNInput />

        <Text style={s.h3Light}>Case Number</Text>
        <CaseInput />

        <Text style={s.h3Light}>Client Id</Text>
        <ClientIdInput />
      </View>

      <View>
        <TouchableOpacity style={s.button}>
          <Text style={{...s.h3Light, fontWeight: 'bold'}}>Select Files</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default App;