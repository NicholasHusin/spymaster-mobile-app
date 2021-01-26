import { AsyncStorage } from 'react-native'

export default async function connect(wordObjectList, teamName) {
    const ip = await AsyncStorage.getItem('serverIP')
    return fetch('http://' + ip + ':5000/clue', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({wordObjectList, teamName}),
    }).then((response) => response.json())
        // console.log(responseJSON)
        // Alert.alert('',
        //     JSON.stringify(responseJSON),
        //     // responseJSON.clue + " (Rating: " + responseJSON.rating.toFixed(2) + ")",
        //     // "This clue hints at:\n" + responseJSON.wordsHintedAt.join('\n')
        // )
}