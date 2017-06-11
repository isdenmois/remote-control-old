import * as React from 'react'
const s = require('./style/grid.css')

interface Props {}

export default class Grid extends React.PureComponent<Props, void> {
    render() {
        return <div className={s.grid}>{this.props.children}</div>
    }
}
