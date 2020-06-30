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
import { inject, observer } from "mobx-react";


const isAndroid = Platform.OS == "android";
const viewPadding = 10;

function  ToDo(props) {
    const { tasks,
        text,
        all,
        save,
        changeTextHandler,
        addTask,
        startTask,
        stopTask,
        deleteTask,
        updateTimer } =props.store;
    updateTimer()
    return (
        <View
          style={[styles.container]}
        >
          <TextInput
            style={styles.textInput}
            onChangeText={changeTextHandler}
            value={text}
            placeholder="Add Tasks"
            returnKeyType="done"
            returnKeyLabel="done"
          />
          <Button title="Add" onPress={() => addTask()} />
          <FlatList
            style={styles.list}
            data={tasks}
            renderItem={({ item, index }) =>
              <View key={item.time} >
                <View style={styles.listItemCont}>
                  <Text style={styles.listItem}>
                    {item.text}
                    {item.time}
                  </Text>
                  <Button title="Start" onPress={() => startTask(index)} />
                  <Button title="Stop" onPress={() => stopTask(index)} />
                  <Button title="X" onPress={() => deleteTask(index)} />
                </View>
                <View style={styles.hr} />
              </View>}
          />
          
          
        </View>
    );
}
export default inject("store")(observer(ToDo));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
  },
  textInput: {

    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    width: "100%"
  }
});
