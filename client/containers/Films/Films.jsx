import React, { PropTypes, PureComponent } from 'react';

import open from '../../open';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import map from '../../map';

export default class FilmsContainer extends PureComponent {
    renderItem(data) {
        const path = data.files.length > 1 ? `/films/${data.hash}` : 'remote';
        const dPath = data.path;
        const onClick = data.files.length === 1 ? () => open(`${dPath}${data.files[0]}`) : undefined;

        return (
            <ListItem
                key={data.hash}
                center={data.name}
                href={path}
                onClick={onClick}
            />
        );
    }

    render() {
        return (
            <List>
                {map(this.context.films, this.renderItem)}
            </List>
        );
    }
}

FilmsContainer.contextTypes = {
    films: PropTypes.array,
};
