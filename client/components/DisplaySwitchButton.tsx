import * as React from 'react'
import Button from './Button'
import socket from '../utils/socket'


interface Props {
    type: 'internal'|'external'
}

export default class DisplaySwitchButton extends React.PureComponent<Props> {

    render() {
        const icon = this.props.type === 'internal' ? 'tv' : 'desktop'
        return (
            <Button icon={icon} onTouchEnd={this.handleTouchEnd}/>
        )
    }

    private handleTouchEnd = () => {
        socket('display-switch', this.props.type)
    }
}
