import React, {Component} from 'react';
import './App.css';
import Time from './components/clock';
import MainFocus from './components/mainFocus';
import Greeting from "./components/greeting";

class App extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            focus: ''
        };
        this.handleName = this.handleName.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    render() {
        return this.toDo();
    }

    toDo() {
        if (this.state.name === '') {
            return (
                <div className="App container-fluid start">
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

}

export default App;
