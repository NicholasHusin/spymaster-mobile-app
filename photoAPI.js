export default function connect(imageBase64) {
    return fetch('http://10.195.23.233:5000/photo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64 }),
    }).then((response) => response.json())
}