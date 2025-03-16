import { FormData } from "./FormData.interface"

export interface ValidationsOptions {
    value: any;     // The value that the field must must match to be valid
    message: string;    // The message to display if the field is invalid
}

export interface Validations {
    [key: keyof FormData]: {
        [key: string]: ValidationsOptions
    }
}