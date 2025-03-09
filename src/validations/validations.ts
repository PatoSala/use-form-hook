/**
 * All validation functions should return true if an error is found on the value
 */
interface Options {
    value: any,
    message: string
}

interface ValidationFunctions {
    required: (value: any, options: Options) => boolean,
    maxLength: (value: any, options: Options) => boolean,
    minLength: (value: any, options: Options) => boolean
}

const required = (value: any, options: Options) => {
    return value === null || value === undefined || value === '';
}

const maxLength = (value: any, options: Options) => {
    return value.length > options.value;
}

const minLength = (value: any, options: Options) => {
    return value.length < options.value;
}

export const validations : ValidationFunctions = {
    required,
    maxLength,
    minLength
}