import {observable, action} from 'mobx'
import {Film} from '../models/Film'
import {Serial} from '../models/Serial'

export default class MetadataStore {
    @observable films: Film[] = []
    @observable serials: Serial[] = []

    @action
    setFilms(films: Film[]) {
        this.films = films
    }

    @action
    setSerials(serials: Serial[]) {
        this.serials = serials
    }
}
