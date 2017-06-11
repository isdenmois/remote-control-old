import * as React from 'react'
const s = require('./style/grid.css')

interface Props {}

export default class Row extends React.PureComponent<Props, void> {
    render() {
        return <div className={s.row}>{this.props.children}</div>
    }
}
