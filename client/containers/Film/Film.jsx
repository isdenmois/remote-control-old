import React, { PropTypes, PureComponent } from 'react';
import find from '../../find';
import map from '../../map';

import List from '../../components/List';
import ListItem from '../../components/ListItem';
import open from '../../open';

export default class FilmContainer extends PureComponent {
    render() {
        const hash = this.props.id;
        const film = find(this.context.films, { hash }) || {};
        const path = film.path;

        return (
            <List>
                {map(film.files, name => (
                    <ListItem
                        key={name}
                        center={name.replace(/_/g, ' ')}
                        href="/remote"
                        onClick={() => open(`${path}${name}`)}
                    />
                ))}
            </List>
        );
    }
}

FilmContainer.propTypes = {
    match: PropTypes.object,
};

FilmContainer.contextTypes = {
    films: PropTypes.array,
};
