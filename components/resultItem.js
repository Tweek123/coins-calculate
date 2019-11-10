import React from 'react';
import { StyleSheet, Button, Text,View,ImageBackground, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

class ResultItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            price: this.props.price,
            icon:  this.props.icon,
            name: this.props.name,
            shortName: this.props,
        }  
    }   



    render() {
        return (
        <View key =  {this.props.name} style={styles.container}>
            <Text style={styles.name}>{this.props.name}</Text>
            <Text style={styles.price}>{this.props.price}</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 0,
      alignItems: "center",
      justifyContent: "space-between",
      padding: 30,
      borderTopWidth: 1,
      borderColor: 'grey'
    },
    name: {
        fontWeight: '400',
        fontSize: 18
    },
    price: {
        color: 'grey'
    }
  });

  export default ResultItem;