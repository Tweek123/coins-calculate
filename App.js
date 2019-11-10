import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView  } from 'react-native';
import ResultItem from './components/resultItem';
import Calculate from './components/calculate';

export default class App extends React.Component {

state = {
  ready: false,
  ratesApi: "",
  value: 1,
  error: false,
};

async requestGetCoins(base) {
  let response;
  let ratesApi;
  let error = false;

  this.setState({
    ready: false
  })


  try {
    response = await fetch('https://api.exchangeratesapi.io/latest?base='+base)
    ratesApi = await response.json();
  } catch {
    error = true;
  }

  this.setState({
    ratesApi: ratesApi,
    ready: true,
    error: error
  })
  
  
}
  
async componentDidMount() {

    await this.requestGetCoins("USD");

  }


roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

inputChange(text) {
  this.setState({
      value: Number(text)
  })
}

initResultView() {
  let resutlView = [];
  let rates = this.state.ratesApi["rates"];

  for(key in rates) {
      rate = this.roundToTwo(rates[key]*this.state.value);

      resutlView.push(
      <ResultItem 
        price = {rate} 
        name = {key} 
        key = {key}
      />)
  }

  return resutlView;
}


render() {
    if(this.state.ready && !this.state.error) {
      
      let resutlView = this.initResultView();

      return (
            <View style={styles.container}>
                <Calculate 
                  inputChange = {this.inputChange.bind(this)} 
                  name = {this.state.ratesApi['base']}
                  value = {this.state.value.toString()}
                  rates = {this.state.ratesApi['rates']}
                  requestGetCoins = {this.requestGetCoins.bind(this)}
                />

            <ScrollView style={styles.resultView}>
                {resutlView}
            </ScrollView>
        </View>
    );

    } else if(!this.state.ready) {
      return (
        <View style={styles.containerNotReady}>
          <Text style={styles.textLoading}>Loading...</Text>
        </View>
      );

    } else if(this.state.error) {
      return (
        <View style={styles.containerErr}>
          <Text style={styles.textErr}>Error</Text>
          <Button
            title="Reload"
            color="black"
            onPress={() => this.requestGetCoins('USD')}
          />
        </View>
      );
    }


  }

}



const styles = StyleSheet.create({
  container: {
    height: "100%"
    },
  resultView: {
    height: "100%"
  },
  containerErr: {
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerNotReady: {
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  textErr: {
    marginBottom: 20,
    fontSize: 30
  },
  textLoading: {
    fontSize: 30
  }
});
