import React, { PropTypes, PureComponent } from 'react';
import List from '../../components/List';
import ListItem from '../../components/ListItem';

export default class SerialsContainer extends PureComponent {
    renderItem(data) {
        const path = data.files.length > 1 ? `/serials/${data.hash}` : 'remote';
        const dPath = data.path;
        const onClick = data.files.length === 1 ? () => open(`${dPath}${data.files[0]}`) : undefined;

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
                {this.context.serials.map(this.renderItem)}
            </List>
        );
    }
}

SerialsContainer.contextTypes = {
    serials: PropTypes.array,
};
