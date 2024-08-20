import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:3100/usuarios";
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      email: '',
      password: '',
    },
    error: null,
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.form;

    try {
      const response = await axios.get(baseUrl, {
        params: { email, password: md5(password) },
      });

      const usuarios = response.data;

      if (usuarios.length > 0) {
        const usuario = usuarios[0];

        cookies.set('id', usuario.id, { path: "/" });
        cookies.set('nombres', usuario.nombres, { path: "/" });
        cookies.set('email', usuario.email, { path: "/" });
        cookies.set('rol', usuario.rol, { path: "/" });

        alert(`Bienvenid@ ${usuario.nombres}`);

        switch (usuario.rol) {
          case 'administrador':
            window.location.href = "/dashboard-admin";
            break;
          case 'conductor':
            window.location.href = "/dashboard-conductor";
            break;
          default:
            window.location.href = "/inicio";
            break;
        }
      } else {
        this.setState({ error: "El usuario o la contraseña no son correctos" });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: "Hubo un problema al iniciar sesión. Inténtalo nuevamente." });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div>
        <nav className="bg-blue-500 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="#" className="text-white font-bold text-2xl">EmpresaTransporte</Link>
            <div className="space-x-4">
              <Link to="/register" className="text-white hover:bg-blue-700 py-2 px-4 rounded transition duration-300">Registrarse</Link>
            </div>
          </div>
        </nav>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="flex container mx-auto my-8 p-6 bg-white shadow-lg w-full md:w-2/5 justify-center items-center rounded-lg">
            <div className="w-full p-8">
              <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={this.iniciarSesion} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <div className="text-center mt-2">
                    <Link to="#" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</Link>
                  </div>
                </div>
                <div className="flex items-center bg-white">
                  <input
                    type="checkbox"
                    id="terminos"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <label htmlFor="terminos" className="ml-2 block text-sm text-gray-700">
                    Acepto los <Link to="#" className="text-blue-600 hover:underline">términos</Link>
                  </label>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-700">¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Registrarse</Link></p>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
