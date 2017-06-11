import * as React from 'react'
import Button from './Button'
import socket from '../utils/socket'


interface Props {}

export default class ShutdownButton extends React.PureComponent<Props, void> {

    render() {
        return (
            <Button icon="shutdown" onTouchEnd={this.handleTouchEnd}/>
        )
    }

    private handleTouchEnd = () => {
        if (confirm('Выключить?')) {
            socket('shutdown', {})
        }
    }
}
