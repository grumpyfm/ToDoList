import React, {Component} from 'react';
import './App.css';
import Time from './components/clock';
import MainFocus from './components/mainFocus';
import Greeting from "./components/greeting";
import ToDoList from './components/toDoList';

class App extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            focus: '',
            toDos: [],
            item: '',
        };
        this.handleName = this.handleName.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChangeToDoList = this.handleChangeToDoList.bind(this);
    }

    render() {
        return this.listWindowInner();
    }

    listWindowInner() {
        if (this.state.name === '') {
            return (
                <div className="App container-fluid beginningPage">
                    <Greeting name={this.state.name}
                              handleName={this.handleName}/>
                </div>
            )
        } else {
            return (
                <div className="App container-fluid">
                    <Time/>
                    <Greeting name={this.state.name}
                              handleName={this.handleName}/>
                    <MainFocus focus={this.state.focus}
                               handleFocus={this.handleFocus}/>
                    <ToDoList toDos={this.state.toDos}
                              handleChangeToDoList={this.handleChangeToDoList}
                    />
                </div>
            )
        }
    }

    handleName(data) {
        this.setState({name: data});
    }

    handleFocus(data) {
        this.setState({focus: data});
    }

    handleChangeToDoList(data) {
        this.setState({toDos: data});
    }

}

export default App;
