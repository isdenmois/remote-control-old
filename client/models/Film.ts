import {File} from './File'

export interface Film {
    hash: string
    name: string
    path: string
    files: File[]
}
