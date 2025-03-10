import { useState, useEffect, useRef } from "react"
import { validate } from "./utils/validate"

interface FormData {
    [key: string]: any
}

interface Errors {
    [key: keyof FormData]: {
        message: string
    }
}

interface RegisterValidations {
    [key: keyof FormData]: Validations
}

interface Validations {
    required?: {
        value: boolean,
        message: string
    },
    maxLength?: {
        value: number,
        message: string
    },
    minLength?: {
        value: number,
        message: string
    },
    email?: {
        value: boolean,
        message: string
    },
    pattern?: {
        value: RegExp,
        message: string
    }
}

export function useForm(defaultValues?: FormData) {
    /**
     *  When register() is called, it sets a field to register
     */
    const fieldsToRegister = useRef<FormData>(defaultValues || {})
    const fieldsValidations = useRef<RegisterValidations>({})

    useEffect(() => {
        setFormData(fieldsToRegister.current)
    }, [fieldsToRegister.current])

    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState<Errors>({});

    const register = (
        name: string,
        options?: {
            validations?: Validations
        }
    ) => {
        /* set initial field value */
        fieldsToRegister.current[name] = defaultValues?.[name] || '';
        if (options?.validations) fieldsValidations.current[name] = options?.validations;

        return {
            name: name,
            value: formData[name] || '',
            onChange: (e: any) => {
                setFormData({
                    ...formData,
                    [name]: e.target.value
                })
            },
            onBlur: () => {
                let fieldErrors = validate(formData, fieldsValidations.current, [name])

                if (fieldErrors) {
                    setErrors({
                        ...errors,
                        [name]: fieldErrors[name]
                    })
                } else {
                    let copyOfErrors = { ...errors };
                    delete copyOfErrors[name];
                    setErrors(copyOfErrors);
                }
            }
        };;
    }

    const handleSubmit = (onSubmit: (formData: FormData) => any) => {
        let errorsBeforeSubmit = validate(formData, fieldsValidations.current, Object.keys(formData));

        if (errorsBeforeSubmit) {
            setErrors(errorsBeforeSubmit)
            return;
        }

        onSubmit(formData)

        setErrors({});
        setFormData(fieldsToRegister.current);
    }

    return {
        register,
        errors,
        handleSubmit
    }
}