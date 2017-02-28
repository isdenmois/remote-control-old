import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import find from 'lodash/find';
import open from '../../open';

class FilmContainer extends PureComponent {
    render() {
        const path = this.props.path;

        return (
            <ul>
                {this.props.files.map(name => (
                    <li key={name}>
                        <Link to="/remote" onClick={() => open(`${path}${name}`)}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
}

FilmContainer.propTypes = {
    files: PropTypes.array,
};

function mapStateToProps(state, props) {
    const hash = props.match.params.id;
    const film = find(state.films, { hash }) || {};

    return {
        path: film.path,
        files: film.files || [],
    };
}

const mapActionsToProps = {

};

export default connect(mapStateToProps)(FilmContainer);
