import React, { Component } from 'react';

import DataProvider from './containers/DataProvider';
import RootContainer from './containers/Root';
import HomeContainer from './containers/Home';
import FilmsContainer from './containers/Films';
import SerialsContainer from './containers/Serials';
import FilmContainer from './containers/Film';
import SerialContainer from './containers/Serial';
import RemoteContainer from './containers/Remote';
import Router from 'preact-router';

export default class extends Component {
    render() {
        return (
            <DataProvider>
                <RootContainer>
                    <Router>
                        <FilmsContainer path="/films" />
                        <SerialsContainer path="/serials" />
                        <FilmContainer path="/films/:id" />
                        <SerialContainer path="/serials/:id" />
                        <RemoteContainer path="/remote" />
                        <HomeContainer default />
                    </Router>
                </RootContainer>
            </DataProvider>
        );
    }
}
