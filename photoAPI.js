export default function connect(imageBase64) {
    return fetch('http://10.194.154.49:5000/image', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64 }),
    }).then((response) => response.json())
}