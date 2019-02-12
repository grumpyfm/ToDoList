import React, {Component} from 'react';

class Greeting extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            inputName: '',
        };
    }

    render() {
        return (
            <div>
                {this.showUserName()}
            </div>
        )
    }

    submitHandler(evt) {
        evt.preventDefault();
        this.props.handleName(this.state.inputName);
        this.setState({
            inputName: ''
        });
    }

    handleChange(event) {
        this.setState({
            inputName: event.target.value
        });
    }

    showUserName() {
        if (this.props.name !== '') {
            return <h2 className={'sayHelloBlock'}> Good {this.checkDayTime()}, {this.props.name}</h2>
        } else {
            return (
                <div>
                <form onSubmit={this.submitHandler}>
                    <input type="text"
                           placeholder={'Enter your first name please'}
                           className={"form-input"}
                           value={this.state.inputName}
                           onChange={this.handleChange}/>
                </form>
                </div>
            )
        }
    }

    checkDayTime() {
        let time = Number((new Date()).getHours());
        let dayTime;
        if ( time>5 && time < 13) {
            dayTime = 'morning'
        } else if (time>=13 && time < 18) {
            dayTime = 'afternoon'
        } else if (time>=18 && time < 21) {
            dayTime = 'evening'
        }else {
            dayTime = 'night'
        }
        return dayTime;
    }
}

export default Greeting;