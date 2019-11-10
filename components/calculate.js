import React from 'react';
import { Text, Picker, TextInput, StyleSheet,View} from 'react-native';


class Calculate extends React.Component {

    constructor(props) {
        super(props)

        this.state =  {
          inputValue: this.props.value,
          notValid: false
        }

    }  

    InitChooseValueView() {
      let chooseValueView = [];
      let rates = this.props['rates'];
    
      for(key in rates) {
        chooseValueView.push(<Picker.Item label={key} value={key} key={key} />)
      }

      return chooseValueView;
    }


      validate(text) {
        this.setState({
          inputValue: text
        })
        
        if(!isNaN(text)) {
          this.props.inputChange(text);
          this.state.notValid = false;
        } else {
          this.state.notValid = true;

        }
        
        }
        
    render() {

      let chooseValueView = this.InitChooseValueView();
      

      return (
      <View style={styles.container}>
          <TextInput 
          onChangeText={text => this.validate(text)} 
          value={this.state.inputValue}
          style={styles.textInput}/>
          <Text style=    { this.state.notValid ?  styles.textNotValid:[styles.textNotValid, styles.notShow]}>value must be a number</Text>
          <Picker
          selectedValue={this.props.name}
          style = {styles.Picker}
          onValueChange={(itemValue) => this.props.requestGetCoins(itemValue)}>
               {chooseValueView}
          </Picker>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      marginBottom: 0,
      borderColor: "grey",
      borderWidth: 1
    },
    textInput: {
        width: '100%',
        fontSize: 40,
        fontWeight: '200',
        height: 80,
        borderBottomWidth: 1,
        borderColor: 'grey',
        paddingLeft: 20,
        letterSpacing: 2
    },
    textNotValid: {
      paddingLeft: 10,
      backgroundColor: 'red',
      color: 'white'
    },
    notShow: {
      display: "none"
    }

  });

  export default Calculate;