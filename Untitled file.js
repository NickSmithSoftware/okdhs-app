import React, {useState} from 'react';
import {BottomSheet, ListItem} from 'react-native-elements';

interface ImagePickerDrawerProps {
  options: [()=>void,()=>void]
}

export const imagePickerDrawer = (props: ImagePickerDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const list = [
    { title: 'Take Picture' },
    { title: 'From Gallery' },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <BottomSheet
      isVisible={isVisible}
      containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
    >
      {list.map((l, i) => (
        <ListItem key={i} containerStyle={l.containerStyle} onPress={props.options[i]}>
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  )
}