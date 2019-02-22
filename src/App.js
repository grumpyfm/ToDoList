import React, {Component} from 'react';
import './App.css';
import Time from './components/time';
import MainFocus from './components/mainFocus';
import Greeting from './components/greeting';
import ToDoList from './components/toDoList';

class App extends Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                name: '',
                focus: '',
                toDos: [],
                item: '',
            }
        };
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    render() {
        return (this.state.userInfo.name === ''?
             (<div className='App container-fluid beginningPage'>
                    <Greeting name={this.state.userInfo.name}
                              handleStateChange={this.handleStateChange}/>
                </div>
            ):
             (<div className='App container-fluid'>
                    <Time/>
                    <Greeting name={this.state.userInfo.name}
                              handleStateChange={this.handleStateChange}/>
                    <MainFocus focus={this.state.userInfo.focus}
                               handleStateChange={this.handleStateChange}/>
                    <ToDoList toDos={this.state.userInfo.toDos}
                              handleStateChange={this.handleStateChange}/>
                </div>)
        )
    }

    handleStateChange(valueToUpdate, data) {
        this.setState({
            userInfo: {...this.state.userInfo, [valueToUpdate]: data}
        })
    }
}

export default App;
