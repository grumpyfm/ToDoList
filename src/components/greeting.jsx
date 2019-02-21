import React, {Component} from 'react';

class Greeting extends Component {
    constructor(props) {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            inputName: '',
        }
    }

    render() {
        if (this.props.name !== '') {
            return <h2 className={'sayHelloBlock'}> Good {this.checkDayTime()}, {this.props.name}</h2>
        } else {
            return(
            <div>
                <h3>Enter your first name please</h3>
                <form onSubmit={this.submitHandler}>
                    <input type="text"
                           maxLength={30}
                           className={"form-input"}
                           value={this.state.inputName}
                           onChange={this.handleChange}/>
                </form>
            </div>)
        }
    }

    submitHandler(evt) {
        evt.preventDefault();
        this.props.handleStateChange('name', this.state.inputName);
        this.setState({
            inputName: ''
        });
    }

    handleChange(event) {
        this.setState({
            inputName: event.target.value
        });
    }

    checkDayTime() {
        let time = Number((new Date()).getHours());
        let dayTime;
        if (time > 5 && time < 13) {
            dayTime = 'morning'
        } else if (time >= 13 && time < 18) {
            dayTime = 'afternoon'
        } else if (time >= 18 && time < 21) {
            dayTime = 'evening'
        } else {
            dayTime = 'night'
        }
        return dayTime;
    }
}

export default Greeting;