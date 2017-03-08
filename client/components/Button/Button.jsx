import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import css from './Button.css';

export default class Button extends PureComponent {
    constructor(props) {
        super(props);

        this.interval = -1;
    }

    setInterval() {
        const interval = this.props.interval;
        this.sendKey();
        this.interval = setInterval(() => this.sendKey(), interval);
    }

    clearInterval() {
        clearInterval(this.interval);
    }

    sendKey() {
        socket.emit('keyboard', {
            key: this.props.k,
            modifiers: this.props.modifiers,
        });
    }

    render() {
        const interval = this.props.interval;
        const icon = `fa-${this.props.icon}`;
        const position = css[this.props.from];
        const className = cn(css.button, 'fa', icon, position);
        const x = this.props.left;
        const y = this.props.top;
        const styles = {
            transform: `translate(${x}px, ${y}px)`,
        };

        return (
            <i
                className={className}
                onTouchStart={() => interval ? this.setInterval() : this.sendKey()}
                onTouchEnd={() => this.clearInterval()}
                style={styles}
            />
        );
    }
}

Button.propTypes = {
    icon: PropTypes.string.isRequired,
    k: PropTypes.string.isRequired,
    modifiers: PropTypes.array,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    from: PropTypes.oneOf(['center', 'top', 'bottom']),
    interval: PropTypes.number,
};

Button.defaultProps = {
    modifiers: [],
    from: 'top',
};
