import { Alert } from 'react-native'

export default function connect(wordObjectList, teamName) {
    return fetch('http://10.195.23.233:5000/clue', {
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