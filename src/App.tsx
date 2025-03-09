import { useForm } from "./hooks/useForm"

function App() {
  const { register, handleSubmit, errors } = useForm()
  
  return (
        <div className="form-container">
          <input
            {...register('cuit', {
              validations: {
                required: {
                  value: true,
                  message: 'El CUIT es requerido'
                },
                maxLength: {
                  value: 11,
                  message: 'El CUIT debe tener 11 dígitos'
                },
                minLength: {
                  value: 11,
                  message: 'El CUIT debe tener 11 dígitos'
                }
              }
            })}
            placeholder="CUIT"
            type="number"
          />
          <p>{errors.cuit && errors.cuit.message}</p>
          <input
            {...register('name', {
              validations: {
                required: {
                  value: true,
                  message: 'El Nombre es requerido'
                }
              }
            })}
            placeholder="Nombre"
          />
          <p>{errors.name && errors.name.message}</p>

          <button onClick={(e) => {
            e.preventDefault()
            handleSubmit((data) => console.log("FORM DATA", data))
          }}>Enviar</button>
        </div>
  )
}

export default App
