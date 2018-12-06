import React, { Component } from 'react';
import {
  Alert, Button, View, Text,
  TextInput, Image, ScrollView, ActivityIndicator
} from 'react-native';
import { KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { styles } from './styles.js';
import connect from './clueAPI.js';
import placeholderWordObjects from './placeholder.js';
import { Icon } from 'react-native-elements';
import { ImagePicker } from 'expo';
import callPhotoAPI from './photoAPI'

export default class setting extends Component {

  state = {
    gameStarted: false,
    text: '',
    wordObjectList: placeholderWordObjects,
    loading: false,
  }

  addWord = () => {
    if (this.state.text !== '') {
      newWordObject = {
        word: this.state.text.toLowerCase(),
        label: 'N',
        stillOnBoard: true,
      }
      this.setState((prevState) => ({
        text: '',
        wordObjectList: prevState.wordObjectList.concat([newWordObject])
      }))
    }
  }

  startGame = () => {
    this.setState({
      gameStarted: true
    })
  }

  endGame = () => {
    this.setState({
      gameStarted: false,
      text: '',
      wordObjectList: []
    })
  }

  getFunctionToNavigateToClueScreen = (teamColor) => {
    return () => {
      this.props.navigation.navigate({
        routeName: 'ClueScreen',
        params: {
          wordObjectList: this.state.wordObjectList,
          team: teamColor,
        }
      })
    }
  }

  // Turn this into modal to look nicer? nah.
  hintDialog = () => {
    Alert.alert(
      'Which team do you want to generate a clue for?',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Blue Team', onPress: this.getFunctionToNavigateToClueScreen('blue') },
        { text: 'Red Team', onPress: this.getFunctionToNavigateToClueScreen('red') }
      ],
      { cancelable: false }
    )
  }

  labelChange(index) {
    const labelList = ['N', 'B', 'R', 'A']
    this.setState((prevState) => {
      let wordObjectList = prevState.wordObjectList
      const newLabel = labelList[(labelList.indexOf(wordObjectList[index].label) + 1) % 4]
      wordObjectList[index].label = newLabel
      return { wordObjectList }
    })
  }

  crossOutWord(index) {
    this.setState((prevState) => {
      let wordObjectList = prevState.wordObjectList
      wordObjectList[index].stillOnBoard = !wordObjectList[index].stillOnBoard
      return { wordObjectList }
    })
  }

  wordBackground(index) {
    const label = this.state.wordObjectList[index].label
    if (label === "B") {
      return styles.Blue;
    }
    if (label === "R") {
      return styles.Red;
    }
    if (label === "A") {
      return styles.Assassin;
    }
    if (label === "N") {
      return styles.Neutral;
    }
  }

  // Change this to modal? or react-native-dialog
  wordChange(index) {
    Alert.alert(
      'Edit/delete this word?',
      this.state.wordObjectList[index].word,
      [
        {
          text: 'Cancel', onPress: () => console.log('Ask me later pressed'), style: 'cancel'
        },
        {
          text: 'Edit', onPress: () => {
            Alert.alert('Placeholder')
          }
        },
        {
          text: 'Delete', onPress: () => {
            this.setState((prevState) => {
              let wordObjectList = prevState.wordObjectList
              wordObjectList.splice(index, 1)
              return { wordObjectList }
            })
          }
        },
      ],
    )
  }

  getWordsFromImage = async () => {
    try {
      console.log('hi number 1')
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        base64: true,
      });
      console.log('hi bunny')

      if (result.cancelled) {
        return
      }

      this.setState({ loading: true })

      let imageBase64 = result.base64
      let wordList = await callPhotoAPI(imageBase64)

      wordObjectList = wordList.map((word) => {
        return {
          word: word.toLowerCase(),
          label: 'N',
          stillOnBoard: true,
        }
      })

      this.setState({
        wordObjectList
      })
    } catch (err) {
      Alert.alert('Server Request Failed')
    } finally {
      this.setState({ loading: false })
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <KeyboardAvoidingView keyboardVerticalOffset={60} style={{ flex: 1 }} behavior="padding" enabled>

        {/* Title Bar */}
        {/* <View style={styles.TitleBar}>
          <Text style={styles.TitleText}>
            SpyMaster
          </Text>
        </View> */}

        {/* List of inputted words */}
        <ScrollView style={styles.WordListContainer}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}>
          {this.state.wordObjectList.map((item, key) => (
            <Text
              key={key}
              onPress={() => { this.state.gameStarted ? this.crossOutWord(key) : this.labelChange(key) }}
              onLongPress={() => { if (!this.state.gameStarted) this.wordChange(key) }}
              style={this.state.wordObjectList[key].stillOnBoard ?
                this.wordBackground(key) :
                [this.wordBackground(key), { textDecorationLine: 'line-through' }]
              }
            > {(key + 1) + ". " + item.word + " "}
              {/* Extra space to make strikethrough look better */}
            </Text>)
          )}

          {/* Padding to the bottom of the list */}
          <View style={{ padding: 3 }} />
        </ScrollView>

        {/* Text Input Field, this is a javascript hack for conditional display */}
        {!this.state.gameStarted &&
          <View style={styles.TextFieldContainer}>

            <TouchableHighlight
              underlayColor='#393D46'
              style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => this.getWordsFromImage()}
            >
              <Icon name='photo-camera' color='white' />
            </TouchableHighlight>
            <TextInput
              style={{ color: 'white' }}
              placeholder="Type Your Word Here!"
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />


          </View>


        }

        {/* Two Buttons */}
        <View style={styles.ButtonParentContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title={this.state.gameStarted ? 'Get Hint' : 'Add Word'}
              color='#585858'
              onPress={this.state.gameStarted ? this.hintDialog : this.addWord}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={this.state.gameStarted ? 'End Game' : 'Start Game'}
              color='#585858'
              onPress={this.state.gameStarted ? this.endGame : this.startGame}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
