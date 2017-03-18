import React, { PureComponent } from 'react';

import Button from '../../components/Button';
import buttons from './buttons.json';

export default class RemoteContainer extends PureComponent {
    render() {
        return (
            <div>
                {buttons.map(b => (
                    <Button
                        key={`${b.key}-${b.icon}`}
                        icon={b.icon}
                        k={b.key}
                        top={b.top}
                        left={b.left}
                        from={b.from}
                        modifiers={b.modifiers}
                        interval={b.interval}
                        confirm={b.confirm}
                    />
                ))}
            </div>
        );
    }
}
