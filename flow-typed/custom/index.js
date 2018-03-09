declare module 'app' {
    declare export type User = {
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        role: 'admin' | 'user' | 'disabled'
    }
}
