import { decorate, observable, action, computed } from "mobx";
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
const convertToArrayOfObject = (tasks) => {
    return     tasks ? JSON.parse(tasks) : []

};
const convertToStringWithSeparators = (tasks) => {
    return JSON.stringify( tasks )
};


class Store {

    tasks = [];
    text = "";
    timer = "";
    addTask = () => {
        let notEmpty = this.text.trim().length > 0;
    
        if (notEmpty) {
            let time = 0
            let key = new Date
            this.tasks = [{ key: key, text: this.text, time: time, timer: false }].concat(this.tasks),
            this.text = ""
            this.save(this.tasks)

        }
      };
    changeTextHandler = text => {
        this.text = text
      };
    all = async () => {
        let temp = await AsyncStorage.getItem("TASKS");
        this.tasks = convertToArrayOfObject(temp)      
            
    };
    save = (tasks) => {
        AsyncStorage.setItem("TASKS",convertToStringWithSeparators(tasks));
    };


  
    startTask = i => {
        let tempArr = this.tasks
        tempArr[i].timer = true
        this.tasks = tempArr
    };
    stopTask = i => {
        let tempArr = this.tasks
        tempArr[i].timer = false
        this.tasks = tempArr
    };
    deleteTask = i => {
        let list = this.tasks.slice();

        list.splice(i, 1);

        this.tasks = list
        this.save(this.tasks)
    };
    updateTimer = () => {
        if (!this.timer){
            this.timer = setInterval( () =>
                {
                    let tempTasks = this.tasks
                    tempTasks.forEach( item => {
                    if (item.timer) {
                        item.time++
                    }
                    })
                    this.tasks = tempTasks.slice()

                }, 1000
            )
        }
        
    };
}

decorate(Store, {
  // previously added values
  tasks: observable,
  text: observable,
  timer:observable,
  all: action,
  save: action,
  changeTextHandler: action,
  addTask: action,
  startTask: action,
  stopTask: action,
  deleteTask: action,
  updateTimer:action
});

export default new Store();