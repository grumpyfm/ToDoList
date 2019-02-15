import React from 'react';
import Clock from 'react-live-clock';

class Time extends React.Component {
    render() {
        return (
            <div className={'clockBlock'}>
                <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Kiev'}/>
            </div>
        )
    }
}

export default Time;
