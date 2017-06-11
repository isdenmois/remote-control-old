
export interface Handlers<T> {
    [index: number]: T
}

export interface Key {
    key: string
    modifiers?: string[]
}
