import { useForm, findFieldError } from '../hook';

function App() {
  const { register, handleSubmit, errors } = useForm();
  
  return (
        <div className="form-container">
          <input
            {...register('cuit', {
              validations: {
                minLength: {
                  value: 4,
                  message: 'El CUIT debe tener al menos 4 dígitos'
                },
                maxLength: {
                  value: 4,
                  message: 'El CUIT no debe tener más de 11 dígitos'
                }
              }
            })}
            placeholder="CUIT"
            type="number"
          />
          <p>{findFieldError(errors, 'cuit')?.message}</p>
          <input
            {...register('firstName', {
              validations: {
                required: {
                  value: true,
                  message: 'El Nombre es requerido'
                }
              }
            })}
            placeholder="Nombre"
          />
          <p>{findFieldError(errors, 'firstName')?.message}</p>

          <input
            {...register('lastName', {
              validations: {
                required: {
                  value: true,
                  message: 'El Apellido es requerido'
                }
              }
            })}
            placeholder="Apellido"
          />
          <p>{findFieldError(errors, 'lastName')?.message}</p>

          <input
            {...register('email', {
              validations: {
                required: {
                  value: true,
                  message: 'El Email es requerido'
                },
                email: {
                  value: true,
                  message: 'El Email no es válido'
                }
              }
            })}
            placeholder="Email"
          />
          <p>{findFieldError(errors, 'email')?.message}</p>

          <input
            type="tel"
            placeholder="Teléfono"
            {...register('phone', {
              validations: {
                required: {
                  value: true,
                  message: 'El Teléfono es requerido'
                }
              }
            })}
          />
          <p>{findFieldError(errors, 'phone')?.message}</p>

          <button onClick={(e) => {
            e.preventDefault()
            handleSubmit((data) => console.log("FORM DATA", data))
          }}>Enviar</button>
        </div>
  )
}

export default App
