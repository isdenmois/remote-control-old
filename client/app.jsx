import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import DataProvider from './containers/DataProvider';
import RootContainer from './containers/Root';
import HomeContainer from './containers/Home';
import FilmsContainer from './containers/Films';
import SerialsContainer from './containers/Serials';
import FilmContainer from './containers/Film';
import SerialContainer from './containers/Serial';
import RemoteContainer from './containers/Remote';


export default class extends Component {
    render() {
        return (
            <DataProvider>
                <BrowserRouter>
                    <RootContainer>
                        <Route exact path="/" component={HomeContainer} />
                        <Route exact path="/films" component={FilmsContainer} />
                        <Route exact path="/serials" component={SerialsContainer} />
                        <Route path="/films/:id" component={FilmContainer} />
                        <Route path="/serials/:id" component={SerialContainer} />
                        <Route path="/remote" component={RemoteContainer} />
                    </RootContainer>
                </BrowserRouter>
            </DataProvider>
        );
    }
}
