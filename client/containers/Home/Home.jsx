import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'preact-router';
import css from './Home.css'

class HomeContainer extends PureComponent {
    render() {
        return (
            <div className={css.wrapper}>
                <Link href="/films" className={css.films}>
                    Фильмы
                </Link>
                <Link href="/serials" className={css.films}>
                    Сериалы
                </Link>
                <Link href="/remote" className={css.control}>
                    Пульт
                </Link>
            </div>
        );
    }
}

export default HomeContainer;
