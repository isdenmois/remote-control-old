const request = require('superagent')
const filter = require('lodash/filter')
const map = require('lodash/map')
const config = require('../config.json')

interface TorrentItem {
    name: string
    hash: string
    save_path: string
}

interface File {
    name: string
    path: string
}

interface Film {
    name: string
    hash: string
    path: string
    files: File[]
}

function getDetails(film: TorrentItem) {
    const url = `${config.qbittorrent}/query/propertiesFiles/${film.hash}`
    return request
        .get(url)
        .then((data: any) => data.body || [])
        .then((files:any) => filter(files, (file: any) => file.priority > 0))
        .then((files:any) => map(files, (file: any) => ({
            name: file.name,
            path: film.save_path + file.name,
        })))
        .then((files:any) => ({
            name: film.name,
            path: film.save_path,
            hash: film.hash,
            files,
        }))
}

function getCategory(category: string) {
    const url = `${config.qbittorrent}/query/torrents`
    return request
        .get(url)
        .query({ category })
        .then((data: any) => data.body || [])
        .then((result: any) => map(result, getDetails))
        .then((promises:any) => Promise.all(promises))
}

let films: Film[] = []
let serials: Film[] = []

interface ParserResult {
    films: Film[]
    serials: Film[]
}

export async function updateData(): Promise<ParserResult> {
    const filmsPromise = getCategory(config.filmsCategory)
    const serialsPromise = getCategory(config.serialsCategory)

    const result = await Promise.all([filmsPromise, serialsPromise])
    films = result[0]
    serials = result[1]

    return {films, serials}
}

export default (): ParserResult => ({films, serials})
