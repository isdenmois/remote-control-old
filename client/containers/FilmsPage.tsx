import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import {List} from 'semantic-ui-react'

import {find, map, sortBy} from 'lodash'
import {fileOpen} from '../utils/socket'
import {Film} from '../models/Film'
import {File} from '../models/File'
import MetadataStore from "../stores/MetadataStore"
import formatName from '../utils/formatName'
const s = require('./style/listItem.css')


interface RouteParams {
    hash?: string
}

interface Props extends RouteComponentProps<RouteParams>{
    metadata: MetadataStore
}

@inject('metadata')
@observer
export default class FilmsPage extends React.Component<Props> {
    private film: Film | undefined

    componentWillMount() {
        const params: RouteParams = this.props.match.params
        if (params && params.hash) {
            this.film = find(this.props.metadata.films, {hash: params.hash})
        }
    }

    componentWillReceiveProps(props: Props) {
        const params: RouteParams = props.match.params
        if (params && params.hash) {
            this.film = find(props.metadata.films, {hash: params.hash})
        } else {
            this.film = undefined
        }
    }

    render() {
        const metadata = this.props.metadata
        if (this.film) {

            return (
                <List celled>
                    {map(sortBy(this.film.files, 'name'), this.renderFile)}
                </List>
            )
        }

        return (
            <List celled>
                {map(sortBy(metadata.films, 'name'), this.renderFilm)}
            </List>
        )
    }

    private renderFilm = (data: Film) => {
        return (
            <List.Item key={data.hash} onClick={() => this.handleFilmClick(data)} className={s.listItem}>
                <List.Icon name="server"/>
                <List.Content>
                    <List.Header>{formatName(data.name)}</List.Header>
                </List.Content>
            </List.Item>
        )
    }

    private renderFile = (file: File) => {
        const filmName = (this.film as Film).name

        return (
            <List.Item key={file.name} onClick={() => this.handleFileClick(file)} className={s.listItem}>
                <List.Icon name="server"/>
                <List.Content>
                    <List.Header>{formatName(file.name, filmName)}</List.Header>
                </List.Content>
            </List.Item>
        )
    }

    private handleFilmClick(film: Film) {
        const {files, hash} = film

        if (files && files.length > 1) {
            this.props.history.push(`/films/${film.hash}`)
        } else if (files && files.length > 0) {
            fileOpen(film.files[0].path)
            this.props.history.push('/remote')
        } else {
            fileOpen(film.path)
            this.props.history.push('/remote')
        }
    }

    private handleFileClick(file: File) {
        fileOpen(file.path)
        this.props.history.push('/remote')
    }
}
