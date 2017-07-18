import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import {List} from 'semantic-ui-react'

import {find, map, sortBy} from 'lodash'
import {fileOpen} from '../utils/socket'
import {Serial} from '../models/Serial'
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
export default class SerialsPage extends React.Component<Props> {
    private serial: Serial | undefined

    componentWillMount() {
        const params: RouteParams = this.props.match.params
        if (params && params.hash) {
            this.serial = find(this.props.metadata.serials, {hash: params.hash})
        }
    }

    componentWillReceiveProps(props: Props) {
        const params: RouteParams = props.match.params
        if (params && params.hash) {
            this.serial = find(props.metadata.serials, {hash: params.hash})
        } else {
            this.serial = undefined
        }
    }

    render() {
        const metadata = this.props.metadata
        if (this.serial) {
            console.log(this.serial)

            return (
                <List celled>
                    {map(sortBy(this.serial.files, 'name'), this.renderFile)}
                </List>
            )
        }

        return (
            <List celled>
                {map(sortBy(metadata.serials, 'name'), this.renderSerial)}
            </List>
        )
    }

    private renderSerial = (data: Serial) => {
        return (
            <List.Item key={data.hash} onClick={() => this.handleSerialClick(data)} className={s.listItem}>
                <List.Icon name="server"/>
                <List.Content>
                    <List.Header>{formatName(data.name)}</List.Header>
                </List.Content>
            </List.Item>
        )
    }

    private renderFile = (file: File) => {
        const serialName = (this.serial as Serial).name

        return (
            <List.Item key={file.name} onClick={() => this.handleFileClick(file)} className={s.listItem}>
                <List.Icon name="server"/>
                <List.Content>
                    <List.Header>{formatName(file.name, serialName)}</List.Header>
                </List.Content>
            </List.Item>
        )
    }

    private handleSerialClick(serial: Serial) {
        const {files, hash} = serial

        if (files && files.length > 1) {
            this.props.history.push(`/serials/${serial.hash}`)
        } else if (files && files.length > 0) {
            fileOpen(serial.files[0].path)
            this.props.history.push('/remote')
        } else {
            fileOpen(serial.path)
            this.props.history.push('/remote')
        }
    }

    private handleFileClick(file: File) {
        fileOpen(file.path)
        this.props.history.push('/remote')
    }
}
