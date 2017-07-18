import * as React from 'react'
import {Icon} from 'semantic-ui-react'
const s = require('./style/button.css')

interface Props {
    icon: string
    onTouchStart?: () => void
    onTouchEnd?: () => void
}

export default class Button extends React.PureComponent<Props> {

    render() {
        const {icon, onTouchEnd} = this.props

        return (
            <div
                className={s.button}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <Icon name={icon} size="big"/>
            </div>
        )
    }

    private handleTouchStart = (event: any) => {
        event.preventDefault()
        if (this.props.onTouchStart) {
            this.props.onTouchStart()
        }
    }
}
