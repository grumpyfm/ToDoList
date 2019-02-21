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
                           placeholder={'Type your to-do here'}
                           className={"form-input form-todo invisible"}
                           value={this.state.item}
                           onChange={this.handleChange}/>
                </form>
                <button onClick={this.handleToDoButton} type={'button'}
                        className={'btn newToDoItem'}>+ Add new
                </button>
            </div>
        )
    }

    handleToDoButton() {

        let button = document.querySelector('.newToDoItem');
        let form = document.querySelector('.form-todo');
        console.log(button.className);
        if (button.className === 'invisible') {
            button.classList.remove('invisible');
            form.className = 'invisible'
        } else {
            button.className = 'invisible';
            form.classList.remove('invisible');
            form.focus()
        }


    }

    componentDidMount() {
        let div = document.querySelector('.toDoList');
        div.onclick = (event) => this.handleClick(event);
        this.checkIfToDos();
    }

    createToDoItem(i) {
        let messageContainer = document.querySelector('.messageContainer');
        let div = document.querySelector('.toDoList');
        if (messageContainer) {
            div.removeChild(messageContainer);
        }
        for (i; i < this.props.toDos.length; i++) {
            let container = document.createElement('div');
            container.className = 'form-check';
            let input = document.createElement('input');
            input.className = 'form-check-input';
            input.type = 'checkbox';
            input.setAttribute('data-action', 'resolve');
            input.value = this.props.toDos[i];

            let label = document.createElement('label');
            label.className = 'form-check-label form-label';
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
                case'resolve':
                    this.handleResolveItem(e);
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
            let repeat = this.state.toDos.filter((item) => item === this.state.item);
            if (repeat.length === 0) {
                let res = this.state.toDos;
                if (this.state.toReplace !== '') {
                    res[this.state.toReplace] = this.state.item;
                } else {
                    res.push(this.state.item);
                }
                this.setState({
                    toDos: res
                });
                this.props.handleStateChange('toDos', this.state.toDos);
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
    }

    handleChange(event) {
        this.setState({
            item: event.target.value
        });
    }

    checkIfToDos() {
        if (this.props.toDos.length === 0) {
            let container = document.querySelector('.toDoList');
            let messageContainer = document.createElement('p');
            messageContainer.innerHTML = 'There is nothing to do yet';
            messageContainer.className = 'messageContainer';
            container.appendChild(messageContainer);
        } else {
            if (this.props.toDos.length !== 0) {
                this.createToDoItem(0);
            }
        }
    }

    handleResolveItem(e) {
        let target = e.target;
        let targetClosest = target.closest('div');
        if (targetClosest.className === 'form-check checked') {
            targetClosest.className='form-check';
        } else {
            targetClosest.className = 'form-check checked';
        }
    }

    handleUpdateItem(e) {
        let target = e.target;
        let index = this.state.toDos.indexOf(target.value);
        let form = document.querySelector('.form-todo');
        this.setState({toReplace: index});
        form.value = target.value;
        form.focus();
    }
}

export default ToDoItem;