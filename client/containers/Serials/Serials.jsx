import React, { PropTypes, PureComponent } from 'react';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import map from '../../map';
import sort from '../../sort';
import open from '../../open';

export default class SerialsContainer extends PureComponent {
    renderItem(data) {
        const path = data.files.length > 1 ? `/serials/${data.hash}` : '/remote';
        const dPath = data.path;
        const onClick = data.files.length === 1 ? () => open(data.files[0].path) : undefined;

        return (
            <ListItem
                key={data.hash}
                href={path}
                center={data.name.replace(/_/g, ' ')}
                onClick={onClick}
            />
        );
    }

    render() {
        return (
            <List>
                {map(sort(this.context.serials, 'name'), this.renderItem)}
            </List>
        );
    }
}

SerialsContainer.contextTypes = {
    serials: PropTypes.array,
};
