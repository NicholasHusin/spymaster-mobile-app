import React, { Component } from 'react';
import {
  Alert, AppRegistry, Button, View, StyleSheet, Text,
  TextInput, Image, ImageBackground, ScrollView
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { addStrikethrough, styles } from './styles.js';
import connect from './apiConnection.js';
import placeholderWordObjects from './placeholder.js';

export default class setting extends Component {

  state = {
    gameStarted: false,
    text: '',
    wordObjectList: placeholderWordObjects,
    // words: ['thief', 'nail', 'boot', 'staff', 'root', 'water', 'teacher',
    //   'knife', 'suit', 'snowman', 'pupil', 'ham', 'gold', 'death',
    //   'dinosaur', 'ground', 'button', 'stream', 'train', 'satellite',
    //   'cold', 'capital', 'boom', 'jet', 'face'],
    // labels: ['R', 'B', 'N', 'N', 'B', 'B', 'N', 'R', 'R', 'B', 'R', 'R',
    //   'B', 'R', 'B', 'N', 'B', 'N', 'R', 'A', 'R', 'B', 'N', 'N', 'B',],
    // stillOnBoard: Array(25).fill(true)
  }

  add = () => {
    if (this.state.text !== '') {
      this.setState((prevState) => ({
        text: '',
        words: prevState.words.concat([prevState.text]),
        labels: prevState.labels.concat(['N']),
        stillOnBoard: prevState.stillOnBoard.concat(true),
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
      words: [],
      labels: [],
      stillOnBoard: [],
    })
  }

  hint = () => {
    console.log(JSON.stringify(this.state.words))
    console.log(JSON.stringify(this.state.labels))
    Alert.alert(
      'Which team do you want to generate a clue for?',
      '',
      [
        {
          text: 'Cancel', onPress: () => console.log('Ask me later pressed'), style: 'cancel'
        },
        {
          text: 'Blue Team', onPress: () => {
            connect(this.state.words, this.state.labels, "blue")
          }
        },
        {
          text: 'Red Team', onPress: () => {
            connect(this.state.words, this.state.labels, "red")
          }
        },
      ],
      { cancelable: false }
    )
  }

  labelChange(index) {
    const labelList = ['N', 'B', 'R', 'A']
    modified = this.state.labels.slice()
    modified[index] = labelList[(labelList.indexOf(modified[index]) + 1) % 4]
    this.setState({
      labels: modified
    })
  }

  crossOutWord(index) {
    modified = this.state.stillOnBoard.slice()
    modified[index] = !modified[index]
    this.setState({
      stillOnBoard: modified
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
      this.state.words[index],
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
            modifiedWords = this.state.words.slice()
            modifiedLabels = this.state.labels.slice()
            modifiedOnBoard = this.state.stillOnBoard.slice()

            modifiedWords.splice(index, 1)
            modifiedLabels.splice(index, 1)
            modifiedOnBoard.splice(index, 1)
            this.setState({
              words: modifiedWords,
              labels: modifiedLabels,
              stillOnBoard: modifiedOnBoard,
            })
          }
        },
      ],
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>

        {/* Title Bar */}
        <View style={{
          height: 60, flexDirection: 'row',
          justifyContent: 'center', backgroundColor: '#393D46'
        }}>
          <Text style={{
            textAlignVertical: 'bottom', fontSize: 20, color: 'white',
            fontWeight: 'bold', fontFamily: 'monospace', paddingBottom: 5
          }}>
            SpyMaster
          </Text>
        </View>

        {/* List of inputted words */}
        <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}>
          {this.state.wordObjectList.map((item, key) => (
            <Text
              key={key}
              onPress={() => { this.state.gameStarted ? this.crossOutWord(key) : this.labelChange(key) }}
              onLongPress={() => { this.state.gameStarted ? this.crossOutWord(key) : this.wordChange(key) }}
              style={this.state.wordObjectList[key].stillOnBoard ?
                this.wordBackground(key) : addStrikethrough(this.wordBackground(key))
              }
            > {(key + 1) + ". " + item.word + " "}
              {/* Extra space to make strikethrough look better */}
            </Text>)
          )}
        </ScrollView>

        {/* Text Input Field, this is a javascript hack for conditional display */}
        {!this.state.gameStarted &&
          <View style={{
            height: 40, flexDirection: 'column',
            backgroundColor: '#393D46', paddingLeft: 10, paddingTop: 10
          }}>
            <TextInput
              style={{ color: 'white' }}
              placeholder="Type Your Word Here!"
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          </View>
        }

        {/* Button */}
        <View style={{
          height: 55, flexDirection: 'row', paddingTop: 10, paddingBottom: 10,
          justifyContent: 'center', backgroundColor: '#393D46'
        }}>
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
