import {StyleSheet} from 'react-native';

export const COLOR = {
    BRAND: '#67a1d9',
    LIGHT: '#f8f8f8',
    DARK: '#2b3769',
    ALIGHT: '#96b2be',
    ADARK: '#5a6fc1'
}

export const s = StyleSheet.create({
    button: {
        backgroundColor: COLOR.ADARK,
        margin: 5,
        width: '50%',
        textAlign: 'center',
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    caseInputContainer: {
        backgroundColor: COLOR.DARK,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        width: '80%'
    },
    clientIdInputContainer: {
        backgroundColor: COLOR.DARK,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        width: '80%'
    },
    container: {
        backgroundColor: COLOR.DARK,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerDark: {
        backgroundColor: COLOR.DARK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    digitInput: {
        color: COLOR.DARK,
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: 'none',
        width: 30,
        fontWeight: 'bold'
    },
    h1Light: {
        color: COLOR.LIGHT,
        fontSize: 35
    },
    h3Light: {
        color: COLOR.LIGHT,
        fontSize: 20,
        textAlign: 'center'
    },
    h6Light: {
        color: COLOR.LIGHT,
        fontSize: 5,
        textAlign: 'center'
    },
    layout: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.DARK
    },
    ssDigitContainer: {
        backgroundColor: COLOR.LIGHT,
        borderRadius: 10,
        margin: 5,
        paddingHorizontal: 0,
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    ssInputContainer: {
        backgroundColor: COLOR.DARK,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        width: '80%'
    },
    textInput: {
        color: COLOR.DARK,
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: 'none'
    },
    textInputContainer: {
        backgroundColor: COLOR.LIGHT,
        borderRadius: 10,
        margin: 5,
        padding: 10,
        width: 300,
    },
    textDark: {
        color: COLOR.DARK
    },
    textLight: {
        color: COLOR.LIGHT
    }
});