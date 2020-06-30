import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform
} from "react-native";

import { Provider } from 'mobx-react';
import store from './mobX/store';


import ToDo from './src/toDo';


const isAndroid = Platform.OS == "android";
const viewPadding = 10;

class App extends Component  {

  render() {
    return (
      <Provider store={store}>
        <ToDo />

        
      </Provider>
    );
  }
}
export default App;

