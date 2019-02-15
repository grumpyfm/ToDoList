import React, {Component} from 'react';

class MainFocus extends Component {
    constructor(props) {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            inputFocus: ''
        };
    }

    render() {
        return (
            <div>
                {this.showMainFocus()}
            </div>
        )
    }

    submitHandler(evt) {
        evt.preventDefault();
        this.props.handleFocus(this.state.inputFocus);
        this.setState({
            inputFocus: ''
        });
    }

    handleChange(event) {
        this.setState({
            inputFocus: event.target.value
        });
    }

    showMainFocus() {
        if (this.props.focus !== '') {
            return (
                <div className={'focusBlock'}>
                    <p className={'focusToday'}> Today </p>
                    <h2 onClick={() => this.props.handleFocus(this.state.inputFocus)}
                        className={'focusMain'}>{this.props.focus}</h2>
                </div>
            )
        } else {
            return (
                <div className={'focusBlock'}>
                    <p className={'focusQuestion'}>What is your main focus for today?</p>
                    <form onSubmit={this.submitHandler}>
                        <input type="text"
                               className={"form-input"}
                               value={this.state.inputFocus}
                               onChange={this.handleChange}/>
                    </form>
                </div>
            )
        }
    }
}

export default MainFocus;