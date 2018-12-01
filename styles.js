import { StyleSheet } from 'react-native'

export function addStrikethrough(style) {
    strikethroughStyle = Object.assign({}, style)
    strikethroughStyle.textDecorationLine = 'line-through'
    return strikethroughStyle
}

export const styles = StyleSheet.create({
    WordListContainer: {
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor: 'white',
    },

    TitleBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#393D46',
    },

    TitleText: {
        textAlignVertical: 'bottom',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        paddingBottom: 5,
    },

    ButtonParentContainer: {
        height: 55,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        backgroundColor: '#393D46',
    },

    buttonContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },

    MainContainer: {
        flex: 1,
        margin: 10
    },

    TextFieldContainer: {
        height: 40,
        flexDirection: 'column',
        backgroundColor: '#393D46',
        paddingLeft: 10,
        paddingTop: 10,
    },

    Blue: {
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#1E90FF',
        color: 'white',
        borderRadius: 20,
        borderColor: '#393D46',
        borderWidth: 1,
        padding: 3,
        marginTop: 7,
        marginRight: 15,
        marginLeft: 15
    },

    Red: {
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#B22222',
        color: 'white',
        borderRadius: 20,
        borderColor: '#393D46',
        borderWidth: 1,
        padding: 3,
        marginTop: 7,
        marginRight: 15,
        marginLeft: 15
    },

    Assassin: {
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#585858',
        color: 'white',
        borderRadius: 20,
        borderColor: '#393D46',
        borderWidth: 1,
        padding: 3,
        marginTop: 7,
        marginRight: 15,
        marginLeft: 15
    },

    Neutral: {
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#cdb79e',
        color: 'white',
        borderRadius: 20,
        borderColor: '#393D46',
        borderWidth: 1,
        padding: 3,
        marginTop: 7,
        marginRight: 15,
        marginLeft: 15
    }
});
