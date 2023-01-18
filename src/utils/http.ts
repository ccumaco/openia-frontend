// En un archivo llamado 'http.js'
import axios from 'axios'

const instance = axios.create()

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Generar nuevo inicio de sesión automáticamente
      // y actualizar el token en el almacenamiento de sesión
      // ...
    }
    return Promise.reject(error)
  }
)

export default instance