import * as React from 'react'
import Button from './Button'
import socket from '../utils/socket'
import Timer = NodeJS.Timer;


interface KeyRequest {
    key: string
    modifiers?: string[]
}

interface Props {
    icon: string
    k: string
    modifiers?: string[]
    interval?: number
    confirm?: string
}

export default class KeyboardButton extends React.PureComponent<Props> {
    private interval: number = 0

    render() {
        const {icon} = this.props
        const onTouchStart = this.props.interval ? this.setInterval : undefined

        return (
            <Button icon={icon} onTouchStart={onTouchStart} onTouchEnd={this.handleTouchEnd}/>
        )
    }

    private handleTouchEnd = () => {
        this.clearInterval()
        this.sendKey()
    }

    private setInterval = () => {
        this.clearInterval()
        this.interval = setInterval(this.sendKey, this.props.interval)
    }

    private clearInterval = () => {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = 0
        }
    }
    
    private sendKey = () => {
        const key: KeyRequest = {key: this.props.k}
        if (this.props.modifiers) {
            key.modifiers = this.props.modifiers
        }

        if (this.props.confirm) {
            if (confirm(this.props.confirm)) {
                socket('key', key)
            }
        } else {
            socket('key', key)
        }
    }
}
