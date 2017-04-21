import React, { PropTypes, PureComponent } from 'react';
import find from '../../find';
import map from '../../map';
import sort from '../../sort';

import List from '../../components/List';
import ListItem from '../../components/ListItem';
import open from '../../open';

export default class SerialContainer extends PureComponent {
    render() {
        const hash = this.props.id;
        const serial = find(this.context.serials, { hash }) || {};
        const path = serial.path;

        return (
            <List>
                {map(sort(serial.files, 'name'), file => (
                    <ListItem
                        key={file.name}
                        href="/remote"
                        center={file.name.replace(/_/g, ' ')}
                        onClick={() => open(file.path)}
                    />
                ))}
            </List>
        );
    }
}

SerialContainer.propTypes = {
    match: PropTypes.object,
};

SerialContainer.contextTypes = {
    serials: PropTypes.array,
};
