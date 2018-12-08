import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Alert, ScrollView, TouchableHighlight } from 'react-native';
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
      if ('err' in clueObjectList) {
        Alert.alert(clueObjectList.err)
      } else {
        this.setState({ clueObjectList })
      }
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
              <TouchableHighlight
                key={index}
                underlayColor='white'
                onPress={() => {
                  Alert.alert(
                    '"' + clueObject.clue + '" hints at:',
                    clueObject.wordsHintedAt.join('\n')
                  )
                }}>
                <View style={styles.clueView}>
                  <View flex={0.8} justifyContent='center'>
                    <Text style={styles.clueText}>
                      {clueObject.clue}
                    </Text>
                  </View>
                  <View flex={0.2} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Text style={[styles.clueText, { color: '#ede79a', fontSize: 27 }]}>
                      {clueObject.wordsHintedAt.length}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            )
          })
        }
        <View style={{ height: 8 }} />
        {/* for extra padding at bottom */}
      </ScrollView>
    )
  }
}
