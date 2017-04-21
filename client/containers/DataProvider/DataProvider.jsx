import React, { PropTypes, PureComponent } from 'react';
import xr from 'xr';

export default class DataProvider extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            films: [],
            serials: [],
        };
    }

    componentWillMount() {
        xr
            .get('/api/films')
            .then(r => r.data)
            .then(films => this.setState({ films }));
        xr
            .get('/api/serials')
            .then(r => r.data)
            .then(serials => this.setState({ serials }));
    }

    getChildContext() {
        return {
            films: this.state.films,
            serials: this.state.serials,
        };
    }

    render() {
        return this.props.children;
    }
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

DataProvider.childContextTypes = {
    films: PropTypes.array,
    serials: PropTypes.array,
};
