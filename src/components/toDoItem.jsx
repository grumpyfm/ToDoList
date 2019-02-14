import React, {Component} from 'react';


class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            item: '',
            toDos: this.props.toDos,
            toReplace: '',
        }
    }

    render() {
        return (
            <div>
                <div className="toDoList"></div>
                <form onSubmit={this.submitHandler}>
                    <input type="text"
                           className={"form-input form-todo"}
                           value={this.state.item}
                           onChange={this.handleChange}/>
                </form>
            </div>
        )
    }

    componentDidMount() {
        let div = document.querySelector('.toDoList');
        div.onclick = (event) => this.handleClick(event);
        this.checkIfTodo();
    }

    createToDoItem(i) {
        let div = document.querySelector('.toDoList');
        for (i; i < this.props.toDos.length; i++) {
            let container = document.createElement('div');
            container.className = 'form-check';
            let input = document.createElement('input');
            input.className = 'form-check-input';
            input.type = 'checkbox';
            input.setAttribute('data-action', 'delete');
            input.value = this.props.toDos[i];

            let label = document.createElement('label');
            label.className = 'form-check-label';
            label.for = this.props.toDos[i];
            label.setAttribute('data-action', 'update');
            label.value = this.props.toDos[i];
            label.innerText = this.props.toDos[i];
            div.appendChild(container);
            container.appendChild(input);
            container.appendChild(label);
        }
    }

    handleClick(e) {
        let target = e.target;
        let action = target.getAttribute('data-action');
        if (action) {
            switch (action) {
                case'delete':
                    this.handleDeleteItem(e);
                    break;
                case 'update':
                    this.handleUpdateItem(e);
                    break;
                default:
                    break;
            }
        }
    }

    submitHandler(evt) {
        evt.preventDefault();
        if (this.state.item !== '') {
            let res = this.state.toDos;
            if (this.state.toReplace !== '') {
                res[this.state.toReplace] = this.state.item;
            } else {
                res.push(this.state.item);
            }
            this.setState({
                toDos: res
            });
            this.props.handleChangeToDoList(this.state.toDos);
            this.setState({
                item: ''
            });
            if (this.state.toReplace !== '') {
                let div = document.querySelector('.toDoList');
                div.innerHTML = '';
                this.setState({
                    toReplace: ''
                });
                this.createToDoItem(0);
            } else {
                this.createToDoItem(this.state.toDos.length - 1);
            }
        }
    }

    handleChange(event) {
        this.setState({
            item: event.target.value
        });
    }

    checkIfTodo() {
        if (this.props.toDos.length === 0) {
            let container = document.querySelector('.toDoList');
            container.innerHTML = 'There is no toDos yet. Add new to get started!'
        } else {
            if (this.props.toDos.length !== 0) {
                this.createToDoItem(0);
            }
        }
    }

    handleDeleteItem(e) {
        let target = e.target;
        let index = this.state.toDos.indexOf(target.value);
        let res = this.state.toDos;
        res.splice(index, 1);
        this.setState({
            toDos: res
        });
        this.props.handleChangeToDoList(this.state.toDos);
        let targetClosest = target.closest('div');

        targetClosest.parentNode.removeChild(targetClosest);
    }

    handleUpdateItem(e) {
        let target = e.target;
        let index = this.state.toDos.indexOf(target.value);
        let form = document.querySelector('.form-todo');
        this.setState({toReplace: index});
        form.value = target.value;
    }
}

export default ToDoItem;