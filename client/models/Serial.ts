import {File} from './File'

export interface Serial {
    hash: string
    name: string
    path: string
    files: File[]
}
