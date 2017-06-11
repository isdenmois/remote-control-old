import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import { Icon, List } from 'semantic-ui-react'
const s = require('./style/homePage.css')

interface Props extends RouteComponentProps<void> {

}

export default class HomePage extends React.Component<Props, void> {

    render() {
        return (
            <List celled size="massive" className={s.homePage}>
                <List.Item onClick={this.handleOpenFilms}>
                    <Icon name="film" />
                    <List.Content>
                        <List.Header>Фильмы</List.Header>
                        Открыть фильм для просмотра
                    </List.Content>
                </List.Item>
                <List.Item onClick={this.handleOpenSerials}>
                    <Icon name="server" />
                    <List.Content>
                        <List.Header>Сериалы</List.Header>
                        Открыть сериал для просмотра
                    </List.Content>
                </List.Item>
                <List.Item onClick={this.handleOpenRemote}>
                    <Icon name="podcast" />
                    <List.Content>
                        <List.Header>Пульт</List.Header>
                        Пульт с общими кнопками
                    </List.Content>
                </List.Item>
            </List>
        )
    }

    private handleOpenFilms = () => {
        this.props.history.push('/films')
    }

    private handleOpenSerials = () => {
        this.props.history.push('/serials')
    }

    private handleOpenRemote = () => {
        this.props.history.push('/remote')
    }
}
