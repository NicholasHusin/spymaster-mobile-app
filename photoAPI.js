import { AsyncStorage } from 'react-native'

export default async function connect(imageBase64) {
    const ip = await AsyncStorage.getItem('serverIP')
    return fetch('http://' + ip + ':5000/photo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64 }),
    }).then((response) => response.json())
}