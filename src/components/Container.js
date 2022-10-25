import { StyleSheet, SafeAreaView } from 'react-native'

const Container = ({ children }) => {
    return (
        <SafeAreaView style={styles.Container}>
            {children}
        </SafeAreaView>
    )
}

export default Container

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#263248"
    }
})