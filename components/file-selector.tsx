import React, {useState, useEffect} from 'react';
import {View, Platform} from 'react-native';
import {Button, Overlay, Icon, Image, Tab, TabView, Chip, Badge} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

interface FileSelectorProps {
  isVisible: boolean,
  setIsVisible: (value: boolean) => void,
  setToUpload: (value: ImageInfo[]) => void,
  buttonStyle: {},
  buttonContainer: {},
  titleStyle: {},
}  

export const FileSelector = (props: FileSelectorProps) => {
    const [images, setImages] = useState<ImageInfo[]>([]);
    const [index, setIndex] = useState(0);

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          allowsMultipleSelection: false,
          quality: 1,
          base64: false
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImages([...images, result]);
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            base64: false,
        });

        console.log(result);
        
        if(!result.cancelled) {
            setImages([...images, result]);
        }
    }

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            props.setIsVisible(false);
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    useEffect(() => {
        props.setToUpload(images);
    }, [images])

  const list = [
    { 
        title: 'Take Picture',
        buttonStyle: props.buttonStyle,
        icon: (
            <Icon
                name="photo-camera"
                size={24}
                color='white' 
                tvParallaxProperties={undefined}
            />
        ),
        onPress: () => {
            takePicture()
        }
    },
    { 
        title: 'From Gallery',
        buttonStyle: props.buttonStyle,
        icon: (
            <Icon
                name="collections"
                size={24}
                color='white' 
                tvParallaxProperties={undefined}
            />
        ),
        onPress: () => {
            pickImages()
        }

    },
    {
      title: 'Cancel',
      buttonStyle: {
        ...props.buttonStyle,
        backgroundColor: 'red'
      },
      onPress: () => {
          props.setIsVisible(false)
          setImages([])
      },
    },
    {
        title: 'Accept',
        buttonStyle: {
          ...props.buttonStyle,
          backgroundColor: 'green'
        },
        onPress: () => {
            props.setIsVisible(false)
        }
    }
  ];

  const overlayStyle = {
      width: '75%',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 35,
      paddingVertical: 20
  }
  
  const containerStyle = props.buttonContainer;
  const titleStyle = props.titleStyle;

  return (
      <View>
          <Overlay overlayStyle={overlayStyle} isVisible={props.isVisible} onBackdropPress={() => {}}>
                <Image
                    source={images[index]? {uri: images[index].uri} : {}}
                    style={images[index]? {width: 240, height: 320, borderRadius: 20} : {}}
                >
                {
                    images[index] && (
                        <View style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                            <Button
                                icon={
                                    <Icon
                                        name="close"
                                        size={40}
                                        color='white' 
                                        tvParallaxProperties={undefined}
                                        iconStyle={{top: 55, right: 23}}
                                        containerStyle={{width: '100%', height: '100%'}}
                                    />}
                                containerStyle={{width: 120, height:120, borderRadius: 50, alignSelf: 'flex-end', bottom: 60, left: 60}}
                                buttonStyle={{width: 120, height:120, borderRadius: 50, backgroundColor: 'red'}}
                                onPress={() => {
                                    let imgArr: ImageInfo[] = [];
                                    images.forEach((img: ImageInfo, i) => {
                                        if(index != i) {
                                            imgArr.push(img);
                                        }
                                    })
                                    setImages(imgArr);
                                }}
                            />
                            <View style={{display: 'flex', flexDirection: 'row', top: 20,  alignItems:'flex-start', justifyContent: 'space-between', height: '100%'}}>
                                <Button 
                                    icon={
                                        <Icon
                                            name="chevron-left"
                                            size={40}
                                            color='white' 
                                            tvParallaxProperties={undefined}
                                        />
                                    }
                                    buttonStyle={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50}}
                                    containerStyle={{backgroundColor: 'rgba(0,0,0,0)', borderRadius: 50, right: 15}}
                                    onPress={() => {
                                        if(index > 0) setIndex(index-1);
                                    }}
                                />
                                <Button 
                                    icon={
                                        <Icon
                                            name="chevron-right"
                                            size={40}
                                            color='white' 
                                            tvParallaxProperties={undefined}
                                        />
                                    }
                                    buttonStyle={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50}}
                                    containerStyle={{backgroundColor: 'rgba(0,0,0,0)', borderRadius: 50, left: 15}}
                                    onPress={() => {
                                        if(index < images.length-1) setIndex(index+1);
                                    }}
                                />
                            </View>
                        </View>
                    )
                }
                </Image>
                {list.map((i, index) => {
                    return (
                        <Button 
                            key={index} 
                            title={i.title} 
                            buttonStyle={i.buttonStyle} 
                            containerStyle={containerStyle} 
                            titleStyle={titleStyle} 
                            onPress={i.onPress}
                            iconRight
                            icon={i.icon}
                        />
                    )
                })}
          </Overlay>
      </View>
  )
}