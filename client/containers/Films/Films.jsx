import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import open from '../../open';

class FilmsContainer extends PureComponent {
    renderItem(data) {
        const path = data.files.length > 1 ? `/films/${data.hash}` : 'remote';
        const dPath = data.path;
        const onClick = data.files.length === 1 ? () => open(`${dPath}${data.files[0]}`) : undefined;

        return (
            <li key={data.hash}>
                <Link to={path} onClick={onClick}>
                    {data.name}
                </Link>
            </li>
        )
    }

    render() {
        return (
            <ul>
                {this.props.films.map(this.renderItem)}
            </ul>
        );
    }
}

FilmsContainer.propTypes = {
    films: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        films: state.films,
    };
}

const mapActionsToProps = {

};

export default connect(mapStateToProps)(FilmsContainer);
