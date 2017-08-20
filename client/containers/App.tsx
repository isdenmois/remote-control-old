import * as React from 'react'
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom'
import {Provider} from 'mobx-react'
import {Icon} from 'semantic-ui-react'

import MetadataStore from '../stores/MetadataStore'
import {socket} from '../utils/socket'

import RemotePage from './RemotePage'
import FilmsPage from './FilmsPage'
import SerialsPage from './SerialsPage'

import {Film} from '../models/Film'
import {Serial} from '../models/Serial'

const s = require('./style/app.css')


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
                    <div className={s.app}>
                        <Switch>
                            <Route path="/films/:hash" component={FilmsPage}/>
                            <Route path="/serials/:hash" component={SerialsPage}/>

                            <Route path="/films" component={FilmsPage}/>
                            <Route path="/serials" component={SerialsPage}/>
                            <Route path="/" component={RemotePage}/>
                        </Switch>
                        <div className={s.footer}>
                            <NavLink strict exact to="/" className={s.link} activeClassName={s.activeLink} onTouchEnd={this.onTouchEnd}>
                                <Icon size="large" name="podcast" className={s.icon}/>
                                <div>Пульт</div>
                            </NavLink>
                            <NavLink to="/films" className={s.link} activeClassName={s.activeLink} onTouchEnd={this.onTouchEnd}>
                                <Icon size="large" name="film" className={s.icon}/>
                                <div>Фильмы</div>
                            </NavLink>
                            <NavLink to="/serials" className={s.link} activeClassName={s.activeLink} onTouchEnd={this.onTouchEnd}>
                                <Icon size="large" name="server" className={s.icon}/>
                                <div>Сериалы</div>
                            </NavLink>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }

    private onTouchEnd = (e: any) => {
        e.preventDefault()
        e.target.click()
    }
}
