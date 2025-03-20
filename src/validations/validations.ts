const required = (value: any, options: any) => {
    if (options.value) {
        return (value === null || value === undefined || value === '') === options.value;
    }
}

const maxLength = (value: any, options: any) => {
    return value.length > options.value;
}

const minLength = (value: any, options: any) => {
    return value.length < options.value;
}

const email = (value: any, options: any) => {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

const pattern = (value: string, options: any) => {
    return !options.value.test(value);
}

const max = (value: any, options: any) => {
    return value > options.value;
}

const min = (value: any, options: any) => {
    return value < options.value;
}

export const validations = {
    required,
    maxLength,
    minLength,
    email,
    pattern,
    min,
    max
}