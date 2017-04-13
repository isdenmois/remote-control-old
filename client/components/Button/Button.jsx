import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import css from './Button.css';

export default class Button extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.interval = -1;
    }

    getClassName() {
        const icon = `fa-${this.props.icon}`;
        const position = css[this.props.from];
        return cn(css.button, 'fa', icon, position);
    }

    getStyles() {
        const x = this.props.left;
        const y = this.props.top;
        return {
            transform: `translate(${x}px, ${y}px)`,
        };
    }

    setInterval() {
        const interval = this.props.interval;
        this.sendKey();
        this.interval = setInterval(() => this.sendKey(), interval);
    }

    clearInterval(event) {
        event.preventDefault();
        clearInterval(this.interval);
    }

    sendKey() {
        socket.emit('keyboard', {
            key: this.props.k,
            modifiers: this.props.modifiers,
        });
    }

    handleTouchStart() {
        if (this.props.confirm && !confirm(this.props.confirm)) {
            return;
        }

        if (this.props.interval) {
            this.setInterval();
        } else {
            this.sendKey();
        }
    }

    render() {
        return (
            <i
                className={this.getClassName()}
                onTouchStart={() => this.handleTouchStart()}
                onTouchEnd={e => this.clearInterval(e)}
                style={this.getStyles()}
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
    confirm: PropTypes.string,
};

Button.defaultProps = {
    modifiers: [],
    from: 'top',
};
