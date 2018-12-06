import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Alert } from 'react-native';
import callClueAPI from './clueAPI'

export default class HelloWorldApp extends Component {

  state = {
    loading: true,
    text: ''
  }

  async componentDidMount() {
    try {
      let clueObjectList = await callClueAPI(
        this.props.navigation.getParam('wordObjectList', []),
        this.props.navigation.getParam('team', '')
      )
      this.setState({ text: JSON.stringify(clueObjectList) })
      console.log(this.state)
    } catch (err) {
      console.log('in here')
      Alert.alert('Server Request Failed')
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Text>{this.state.text}</Text>
    )
  }
}
