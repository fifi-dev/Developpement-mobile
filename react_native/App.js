import React, {
  Component
} from 'react';
import Style from './src/Style';
import InputButton from './src/InputButton';

import {
  View,
  Text,
  AppRegistry
} from 'react-native';


// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
  ['','C', 'CE', '%', ],
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];


class ReactCalculator extends Component {
  render() {
      return (
          <View style={Style.rootContainer}>
              <View style={Style.displayContainer}>
                  <Text style={Style.displayText}>{this.state.inputValue}</Text>
              </View>
              <View style={Style.inputContainer}>
                  {this._renderInputButtons()}
              </View>
          </View>
      )
  }

  _renderInputButtons() {
      let views = [];

      for (var r = 0; r < inputButtons.length; r ++) {
          let row = inputButtons[r];

          let inputRow = [];
          for (var i = 0; i < row.length; i ++) {
              let input = row[i];

              inputRow.push(
                  <InputButton
                      value={input}
                      onPress={this._onInputButtonPressed.bind(this, input)}
                      key={r + "-" + i}/>
              );
          }

          views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
      }

      return views;
  } 
  
  _onInputButtonPressed(input) {
      switch (typeof input) {
          case 'number':
              return this._handleNumberInput(input)
          case 'string':
              return this._handleStringInput(input)
      }
  }

  _handleNumberInput(num) {
      let inputValue = this.state.inputValue;
      let isDecimal = this.state.isDecimal;

      if(isDecimal) {
        if(num > 0) {
          inputValue = eval(inputValue + num).toString();
        } else {
          inputValue = inputValue + num;
        }
      } else {
        inputValue = (inputValue * 10) + num;
      }

      this.setState({
          inputValue: inputValue,
          isDecimal: isDecimal,
          history: this.state.history + inputValue
      })
  }

  _handleStringInput(str) {
      switch (str) {
          case '/':
          case '*':
          case '+':
          case '-':
              this.setState({
                  selectedSymbol: str,
                  previousInputValue: this.state.inputValue,
                  inputValue: 0,
                  isDecimal: null,
                history: this.state.history + str
              });
              break;
          case '=':
              let symbol = this.state.selectedSymbol,
                  inputValue = this.state.inputValue,
                  previousInputValue = this.state.previousInputValue;

              if (!symbol) {
                  return;
              }

              if (symbol == '/'){
                if (inputValue == 0){
                  alert("Division by 0 is not possible")
                  return;
                }
              }

              this.setState({
                  previousInputValue: 0,
                  inputValue: eval(previousInputValue + symbol + inputValue),
                  selectedSymbol: null,
                  isDecimal: null,
                  history: this.state.history + str + eval(previousInputValue + symbol + inputValue)
              });


              break;
          case 'C':
              this.setState({
                  inputValue: this.state.inputValue.toString().slice(0, -1),
                  isDecimal: this.state.isDecimal
               });

               if (this.state.inputValue.length <2) {

                this.setState({
                  inputValue: 0,
                  isDecimal: null,
                })
                return;

               }

               if (TouchList.state == 0){

                this.setState({
                  inputValue: 0,
                  isDecimal: null,
                })
                return;

               }

            break;
            case 'CE':
              this.setState({
                isDecimal: null,
                selectedSymbol: null,
                previousInputValue: 0,
                inputValue: 0
             });
          break;
        case '.':
            let isDecimal = this.state.isDecimal;
            if(isDecimal) break;

            this.setState({
                isDecimal: true,
                inputValue: this.state.inputValue + str,
                history: this.state.history + this.state.inputValue
            });
            break;
            case '%':
        this.setState({
          inputValue: this.state.inputValue / 100
        });
        break;
      }
  }

  constructor(props) {
      super(props);

      this.state = {
          previousInputValue: 0,
          inputValue: 0,
          selectedSymbol: null,
          isDecimal : null,
          memorizedNumber: 0,
          history : ''
      }
  }
  
}

export default ReactCalculator