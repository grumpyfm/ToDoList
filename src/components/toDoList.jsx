import React, {Component} from 'react';
import ToDoItem from './toDoItem';


class ToDoList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id='listWindow'>
                <h3>{this.props.toDos.length} To Do
                    <hr/>
                </h3>
                <div>
                    <ToDoItem toDos={this.props.toDos}
                              handleStateChange={this.props.handleStateChange}/>
                </div>
            </div>
        );
    }

}

export default ToDoList;