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
                <div className='toDoList'>
                    {this.createToDoItem()}
                </div>
                <div className='newItemBlock'>
                    <button onClick={this.formVisible} type={'button'}
                            className='btn newToDoItem'>+ Add new
                    </button>
                    <form onSubmit={this.submitHandler}>
                        <input type='text'
                               placeholder={'Type your to-do here'}
                               className='form-input form-todo invisible'
                               onChange={this.handleChange}
                               onBlur={() => this.buttonVisible()}/>
                    </form>
                </div>
            </div>
        )
    }


    formVisible() {
        let button = document.querySelector('.newToDoItem');
        let form = document.querySelector('.form-todo');
        form.className = 'form-input form-todo';
        form.focus();
        button.className = 'btn newToDoItem invisible';
    }

    buttonVisible() {
        let button = document.querySelector('.newToDoItem');
        let form = document.querySelector('.form-todo');
        form.className = 'form-input form-todo invisible';
        form.value = '';
        button.className = 'btn newToDoItem ';
        if (this.state.toReplace !== '') {
            this.setState({toReplace: ''});
        }
    }

    createToDoItem() {
        return (this.props.toDos.length !== 0 ? (
            this.props.toDos.map((el, index) =>
                <div className='form-check' key={index}>
                    <input type='checkbox' className='form-check-input checkBox' checked={!!el.checked}
                           value={el.value} onChange={(e) => this.handleResolveItem(e)}/>
                    <label
                        className={el.checked ? ('form-check-label form-label checked') : ('form-check-label form-label')}
                        data-value={el.value} data-action={el.checked ? '' : 'update'} htmlFor={el.value}
                        onClick={(e) => this.handleUpdateItem(e)}>{el.value}</label>

                </div>
            )) : (<div className='messageContainer'>There is nothing to do yet</div>
        ))
    }

    submitHandler(evt) {
        evt.preventDefault();
        if (this.state.item !== '') {
            let exist = this.state.toDos.filter((el) => el.value === this.state.item);
            if (exist.length === 0) {
                let res = this.state.toDos;
                if (this.state.toReplace !== '') {
                    res[this.state.toReplace].value = this.state.item;
                } else {
                    res.push({value: this.state.item, checked: false});
                }
                this.setState({
                    toDos: res
                });
                this.props.handleStateChange('toDos', this.state.toDos);
                this.setState({
                    item: ''
                });
                this.setState({
                    toReplace: ''
                })
            }
        }
        this.buttonVisible();
    }

    handleChange(event) {
        this.setState({
            item: event.target.value
        });
    }

    handleResolveItem(e) {
        let target = e.target;
        let targetClosest = target.closest('div');
        let res = this.state.toDos;
        let label = targetClosest.querySelector('.form-label');
        let index = this.state.toDos.map((item) => item.value).indexOf(target.value);

        this.props.handleStateChange('toDos', this.state.toDos);
        if (label.className === 'form-check-label form-label') {
            res[index] = {value: this.state.toDos[index].value, checked: true};
            label.className = 'form-check-label form-label checked';
            label.removeAttribute('data-action', 'update');
        } else {
            res[index] = {value: this.state.toDos[index].value, checked: false};
            label.className = 'form-check-label form-label';
            label.setAttribute('data-action', 'update');
        }
        this.setState({
            toDos: res
        });
    }

    handleUpdateItem(e) {
        let target = e.target;
        let value = target.getAttribute('data-value');
        let attribute = target.getAttribute('data-action');
        if (attribute !== '') {
            this.formVisible();
            let index = this.state.toDos.map((item) => item.value).indexOf(value);
            let form = document.querySelector('.form-todo');
            this.setState({toReplace: index});
            form.value = value;
        } else {
            this.buttonVisible();
        }
    }
}

export default ToDoItem;