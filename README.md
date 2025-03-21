# use-form-hook
A simple hook to manage forms in react applications.

## Instalation

```bash
  npm install @patosala/use-form-hook
```

## Usage

```javascript
import { useForm, findError } from "@patosala/use-form-hook";

function App() {
  const { register, errors, handleSubmit } = useForm();

  return (
      <div>
        <input
            placeholder="Email"
            {...register("email", {
                required: {
                    value: true,
                    message: "Email is required"
                },
                email: {
                    value: true,
                    message: "Enter a valid email"
                }
            })}
        />
        <p>{findError(errors, "email")?.message}</p>

        <input
            placeholder="password"
            {...register("password", {
                required: {
                    value: true,
                    message: "Password is required"
                },
                minLength: {
                    value: 10,
                    message: "Password must be 10 characters long"
                }
            })}
        />
        <p>{findError(errors, "password")?.message}</p>

        <button onSubmit={handleSubmit((formData) => {
            return console.log(formData)
        })}>
            Submit
        </button>
      </div>
  )
}
```


