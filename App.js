import React, { Component } from 'react';
import {
  Alert, Button, View, Text,
  TextInput, Image, ScrollView
} from 'react-native';
import { KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { addStrikethrough, styles } from './styles.js';
import connect from './apiConnection.js';
import placeholderWordObjects from './placeholder.js';
import { Icon } from 'react-native-elements';


export default class setting extends Component {

  state = {
    gameStarted: false,
    text: '',
    wordObjectList: placeholderWordObjects,
  }

  add = () => {
    if (this.state.text !== '') {
      newWordObject = {
        word: this.state.text,
        label: 'N',
        stillOnBoard: true,
      }
      this.setState((prevState) => ({
        text: '',
        wordObjectList: prevState.wordObjectList.concat([newWordObject])
      }))
    }
  }

  imageAdd(word) {
    console.log(word)
    if (word !== '') {
      newWordObject = {
        word: word,
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

  hint = () => {
    Alert.alert(
      'Which team do you want to generate a clue for?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Ask me later pressed'), style: 'cancel'
        },
        {
          text: 'Blue Team',
          onPress: () => connect(this.state.wordObjectList, "blue")
        },
        {
          text: 'Red Team',
          onPress: () => connect(this.state.wordObjectList, "red")
        },
      ],
      { cancelable: false }
    )
  }

  labelChange(index) {
    const labelList = ['N', 'B', 'R', 'A']
    modified = this.state.wordObjectList.slice()
    modified[index].label = labelList[(labelList.indexOf(modified[index].label) + 1) % 4]
    this.setState({
      wordObjectList: modified
    })
  }

  crossOutWord(index) {
    modified = this.state.wordObjectList.slice()
    modified[index].stillOnBoard = !modified[index].stillOnBoard
    this.setState({
      wordObjectList: modified
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

  wordChange(index) {
    Alert.alert(
      this.state.wordObjectList[index].word,
      '',
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
            modified = this.state.wordObjectList.slice()
            modified.splice(index, 1)
            this.setState({
              wordObjectList: modified
            })
          }
        },
      ],
    )
  }

  cameraAPI() {
    fetch('http://10.194.154.49:5000/example.png').then((response) => response.json()).then((responseJSON) => {
        Alert.alert('',
            JSON.stringify(responseJSON),
            // responseJSON.clue + " (Rating: " + responseJSON.rating.toFixed(2) + ")",
            // "This clue hints at:\n" + responseJSON.wordsHintedAt.join('\n')
        )
        
        var wordArr = responseJSON;

        for(var i = 0; i < wordArr.length; i++) {
          this.imageAdd(wordArr[i])
      }
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>

        {/* Title Bar */}
        <View style={styles.TitleBar}>
          <Text style={styles.TitleText}>
            SpyMaster
          </Text>
        </View>

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
                this.wordBackground(key) : addStrikethrough(this.wordBackground(key))
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

            <TouchableHighlight underlayColor= '#393D46' style={{marginRight: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.cameraAPI()}>
              <Icon name='photo-camera' color='white' />
            </TouchableHighlight>
            <TextInput
              style={{ color: 'white'}}
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
              onPress={this.state.gameStarted ? this.hint : this.add}
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
