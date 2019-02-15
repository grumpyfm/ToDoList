import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ToDoItem from './toDoItem';


class ToDoList extends Component {
    constructor() {
        super();

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        return (
            <div>
                <Button variant="primary" className={'todoButton'} onClick={this.handleShow}>ToDo</Button>
                <Modal id="listWindow" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.toDos.length} To Do</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <ToDoItem toDos={this.props.toDos}
                                      handleChangeToDoList={this.props.handleChangeToDoList}/>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

}

export default ToDoList;