import * as React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'mobx-react'

import MetadataStore from './stores/MetadataStore'
import {socket} from './utils/socket'

import HomePage from './containers/HomePage'
import RemotePage from './containers/RemotePage'
import FilmsPage from './containers/FilmsPage'
import SerialsPage from './containers/SerialsPage'

import {Film} from './models/Film'
import {Serial} from './models/Serial'


const stores = {
    metadata: new MetadataStore(),
}

socket.on('films', (films: Film[]) => stores.metadata.setFilms(films))
socket.on('serials', (serails: Serial[]) => stores.metadata.setSerials(serails))

export default class extends React.Component<any> {
    render() {
        return (
            <Provider {...stores}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/remote" component={RemotePage}/>

                        <Route path="/films/:hash" component={FilmsPage}/>
                        <Route path="/serials/:hash" component={SerialsPage}/>

                        <Route path="/films" component={FilmsPage}/>
                        <Route path="/serials" component={SerialsPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
