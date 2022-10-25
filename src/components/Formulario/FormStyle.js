import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    textInput: {
        marginVertical: 5,
        padding: 10,
        paddingStart: 30,
        width: "75%",
        height: 40,
        marginTop: 20,
        borderRadius: 15,
        backgroundColor: "#EDEDED"
    },

    textInputError: {
        marginVertical: 5,
        padding: 10,
        paddingStart: 30,
        width: "75%",
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 15,
        backgroundColor: "#A87875"
    },

    buttonForm: {
        alignItems: "center",
        padding: 10,
        width: "50%",
        height: 40,
        marginTop: 20,
        borderRadius: 15,
        backgroundColor: "black"
    },

    text: {
        alignItems: "center",
        color: "white"
    },

    textError: {
        color: "red",
        right: 60,
    },
})