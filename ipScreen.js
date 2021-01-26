import React, { Component } from 'react';
import {
    Text, View, ActivityIndicator, Alert, Keyboard,
    ScrollView, TouchableHighlight, TextInput, Button, AsyncStorage
} from 'react-native';

import { styles } from './styles'

export default class IPScreen extends Component {

    state = {
        text: ''
    }

    async componentDidMount() {
        if ((await AsyncStorage.getAllKeys()).includes('serverIP')) {
            const currIP = await AsyncStorage.getItem('serverIP')
            this.setState({ text: currIP })
        }
    }

    render() {

        return (
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 20 }}>Type the IP address of the server:</Text>
                <View style={{ height: 10 }} />
                <TextInput
                    style={{ fontSize: 20, textAlign: 'center' }}
                    placeholder="XX.XXX.XX.XXX"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <View style={{ height: 50 }} />
                <View style={{ width: 100 }}>
                    <Button
                        title='Save'
                        color='#585858'

                        onPress={() => {
                            AsyncStorage.setItem('serverIP', this.state.text)
                            Keyboard.dismiss()
                        }}
                    />
                </View>
            </View>
        )
    }
}
