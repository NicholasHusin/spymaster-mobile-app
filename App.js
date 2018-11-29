import React, { Component } from 'react';
import { Alert, AppRegistry, Button, View, StyleSheet, Text, TextInput, Image, ImageBackground, ScrollView} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

export default class setting extends Component {

  state = {
    text: ''
  }

  words = []
  labels = []
  response = ''

  add = () => {
    if (this.state.text !== '') {
      this.words.push(this.state.text)
      this.labels.push("N")
    }
    this.state.text = ""
    this.textInput.clear()

    this.forceUpdate()
  }


  hint = () => {
    console.log(JSON.stringify(this.words))
    console.log(JSON.stringify(this.labels))
    this.words = []
    this.labels = []
    this.forceUpdate()
    Alert.alert(
      'Generate Clue For:',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Ask me later pressed'), style: 'cancel'},
        {text: 'Blue Team', onPress: () => {this.connect("blue")}},
        {text: 'Red Team', onPress: () => {this.connect("red")}},
      ],
      { cancelable: false }
    )
  }

  connect(teamName) {
    fetch('http://10.195.23.233:5000', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team: teamName,
        words: this.words,
        labels: this.labels
      }),
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }

  labelChange(index) {
    if (this.labels[index] === "N") {
      this.labels[index] = "B";
    }
    else if (this.labels[index] === "B") {
      this.labels[index] = "R";
    }
    else if (this.labels[index] === "R") {
      this.labels[index] = "A";
    }
    else if (this.labels[index] === "A") {
      this.labels[index] = "N";
    }
    this.forceUpdate()
  }

  wordBackground(index) {
    if (this.labels[index] === "B") {
      return styles.Blue;
    }
    if (this.labels[index] === "R") {
      return styles.Red;
    }
    if (this.labels[index] === "A") {
      return styles.Assassin;
    }
    if (this.labels[index] === "N") {
      return styles.Neutral;
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>

        {/* Title Bar */}
        <View style={{height: 60, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#393D46'}}>
          <Text style={{textAlignVertical: 'bottom', fontSize: 20, color: 'white', fontWeight: 'bold', fontFamily: 'monospace', paddingBottom: 5}}> SpyMaster </Text>
        </View>

        {/* List of inputted words */}
        <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor:'white'}}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{
            this.scrollView.scrollToEnd({animated: true});
        }}>
          {this.words.map((item, key)=>(
            <Text key={key} onPress={() => {this.labelChange(key)}}
            style={this.wordBackground(key)}>
              {key + 1 + ". " + item}
            </Text>)
          )}
        </ScrollView>

        {/* Text Input Field */}
        <View style={{height: 40, flexDirection: 'column', backgroundColor: '#393D46'}}>
          <TextInput style={{color: 'white'}}
            ref = {text => {this.textInput = text}}
            placeholder="Type Your Word Here!"
            onChangeText={(text) => this.setState({text})}
          />
        </View>


        {/* Button */}
        <View style={{height: 50, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#393D46'}}>
          <View style={styles.buttonContainer}>
            <Button
                title = 'Add Word'
                color = '#585858'
                onPress = {this.add}
                />
          </View>

          <View style={styles.buttonContainer}>
            <Button
                title = 'Get Hint'
                color = '#585858'
                onPress = {this.hint}
                />
          </View>

        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },

    MainContainer: {
      flex: 1,
      margin: 10
    },

    Blue: {
      fontFamily: 'monospace',
      fontSize : 18,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#1E90FF',
      color: 'white',
      borderRadius: 20,
      borderColor: '#393D46',
      borderWidth: 1,
      padding: 3,
      marginTop: 7,
      marginRight: 15,
      marginLeft: 15
    },

    Red: {
      fontFamily: 'monospace',
      fontSize : 18,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#B22222',
      color: 'white',
      borderRadius: 20,
      borderColor: '#393D46',
      borderWidth: 1,
      padding: 3,
      marginTop: 7,
      marginRight: 15,
      marginLeft: 15
    },

    Assassin: {
      fontFamily: 'monospace',
      fontSize : 18,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#585858',
      color: 'white',
      borderRadius: 20,
      borderColor: '#393D46',
      borderWidth: 1,
      padding: 3,
      marginTop: 7,
      marginRight: 15,
      marginLeft: 15
    },

    Neutral: {
      fontFamily: 'monospace',
      fontSize : 18,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#cdb79e',
      color: 'white',
      borderRadius: 20,
      borderColor: '#393D46',
      borderWidth: 1,
      padding: 3,
      marginTop: 7,
      marginRight: 15,
      marginLeft: 15
    }
});
