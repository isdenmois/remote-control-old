import React, { PropTypes, PureComponent } from 'react';

export default class DataProvider extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            serials: [],
        };
    }

    componentWillMount() {
        socket.on('serials', serials =>  this.setState({ serials }));
        socket.on('films', films =>  this.setState({ films }));

        socket.emit('data', 'films');
        socket.emit('data', 'serials');
    }

    componentWillUnmount() {
        socket.off('films');
        socket.off('serials');
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
