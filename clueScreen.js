import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Alert, ScrollView } from 'react-native';
import callClueAPI from './clueAPI'
import { styles } from './styles'

export default class HelloWorldApp extends Component {

  state = {
    loading: true,
    clueObjectList: []
  }

  async componentDidMount() {
    try {
      let clueObjectList = await callClueAPI(
        this.props.navigation.getParam('wordObjectList', []),
        this.props.navigation.getParam('team', '')
      )
      this.setState({clueObjectList})
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
      <ScrollView>
        {
          this.state.clueObjectList.map((clueObject, index) => {
            return (
              <View style={styles.clueView} key={index}>
                <View flex={0.8}>
                  <Text style={styles.clueText}>
                    {clueObject.clue}
                  </Text>
                </View>
                <View flex={0.2} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Text style={[styles.clueText, ]}>
                    {clueObject.wordsHintedAt.length}
                  </Text>
                </View>
              </View>
            )
          })
        }
        <View style={{ height: 8 }} />
        {/* for extra padding at bottom */}
      </ScrollView>
    )
  }
}
