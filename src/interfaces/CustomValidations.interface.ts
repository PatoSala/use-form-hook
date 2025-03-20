export interface CustomValidations {
    [key: string]: (value: any, options: { value: any, message: string }) => boolean;
}