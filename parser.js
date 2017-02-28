const request = require('superagent');
const filter = require('lodash/filter');
const map = require('lodash/map');
const config = require('./config.json');

function getDetails(film) {
    const url = `${config.qbittorrent}/query/propertiesFiles/${film.hash}`;
    return request
        .get(url)
        .then(data => data.body || [])
        .then(files => filter(files, file => file.priority > 0))
        .then(files => map(files, file => file.name))
        .then(files => ({
            name: film.name,
            path: film.save_path,
            hash: film.hash,
            files,
        }))
}

function getCategory(category) {
    const url = `${config.qbittorrent}/query/torrents`;
    return request
        .get(url)
        .query({ category })
        .then(data => data.body || [])
        .then(result => map(result, getDetails))
        .then(promises => Promise.all(promises));
}

module.exports = function () {
    const filmsPromise = getCategory(config.filmsCategory);
    const serialsPromise = getCategory(config.serialsCategory);

    return Promise.all([
        filmsPromise,
        serialsPromise,
    ])
        .then(([films, serials]) => ({ films, serials }));
};
