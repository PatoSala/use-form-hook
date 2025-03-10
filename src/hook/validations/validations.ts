/**
 * All validation functions should return true if an error is found on the given value
 */
interface Options {
    value: any,
    message: string
}

const required = (value: any, options: Options) => {
    return (value === null || value === undefined || value === '') === options.value;
}

const maxLength = (value: any, options: Options) => {
    return value.length > options.value;
}

const minLength = (value: any, options: Options) => {
    return value.length < options.value;
}

const email = (value: any, options: Options) => {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

const pattern = (value: RegExp, options: Options) => {
    return !options.value.test(value);
}

export const validations = {
    required,
    maxLength,
    minLength,
    email,
    pattern
}