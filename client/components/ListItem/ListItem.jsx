import React, { PureComponent, PropTypes } from 'react';
import { route } from 'preact-router';

import css from './ListItem.css';

class ListItem extends PureComponent {
    onClick(event) {
        event.preventDefault();
        if (this.props.onClick) {
            this.props.onClick();
        }
        route(this.props.href);
    }

    render() {
        const center = this.props.center.replace(/_/g, ' ');

        return (
            <a
                className={css.listItem}
                href={this.props.href}
                onClick={(e) => this.onClick(e)}
            >
                <div className={css.center}>
                    {center}
                </div>
                {this.props.right && (
                    <div className={css.right}>
                        {this.props.right}
                    </div>
                )}
            </a>
        );
    }
}

ListItem.propTypes = {
    center: PropTypes.node,
    right: PropTypes.node,
    href: PropTypes.string,
    onClick: PropTypes.func,
};

export default ListItem;
