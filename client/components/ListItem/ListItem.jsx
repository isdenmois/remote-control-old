import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import css from './ListItem.css';

class ListItem extends PureComponent {
    render() {
        const center = this.props.center.replace(/_/g, ' ');

        return (
            <Link
                className={css.listItem}
                to={this.props.href}
                onClick={this.props.onClick}
            >
                <div className={css.center}>
                    {center}
                </div>
                {this.props.right && (
                    <div className={css.right}>
                        {this.props.right}
                    </div>
                )}
            </Link>
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
