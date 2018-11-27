import React, { Component } from 'react';
import { Alert, AppRegistry, Button, View, StyleSheet, Text, TextInput, Image, ScrollView} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

export default class setting extends Component {

  state = {
    text: ''
  }

  words = []

  add = () => {
    constructor();
    if (this.state.text !== '') {
      this.words.push(this.state.text)
    }
    this.state.text = ""
    this.textInput.clear()

    this.forceUpdate()
  }


  hint = () => {
    this.words = []
    this.forceUpdate()
    Alert.alert('API Not Connected Yet')
  }

  render() {
    var wordArr = this.words

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>

        {/* Title Bar */}
        <View style={{height: 60, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#393D46'}}>
          <Text style={{textAlignVertical: 'bottom', fontSize: 20, color: 'white', fontWeight: 'bold', fontFamily: 'monospace', paddingBottom: 5}}> SpyMaster </Text>
        </View>

        {/* List of inputted words */}
        <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor:'white'}}>
          { wordArr.map((item, key)=>(
            <Text key={key} style={styles.TextStyle}> { item } </Text>)
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

    TextStyle:{
      fontFamily: 'monospace',
      fontSize : 18,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadowColor:'#585858',
      textShadowOffset:{width: 5, height: 5},
      textShadowRadius:100,
    }
});
