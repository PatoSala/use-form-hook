import { FormData } from "./FormData.interface"

export interface Errors {
    [key: keyof FormData]: {
        message: string
    }
}