import React, { PureComponent } from 'react';
import map from 'lodash/map';
import Button from '../../components/Button';
import buttons from './buttons.json';

export default class RemoteContainer extends PureComponent {
    render() {
        return (
            <div>
                {map(buttons, b => (
                    <Button
                        key={b.key}
                        icon={b.icon}
                        k={b.key}
                        top={b.top}
                        left={b.left}
                        from={b.from}
                        modifiers={b.modifiers}
                        interval={b.interval}
                    />
                ))}
            </div>
        );
    }
}
