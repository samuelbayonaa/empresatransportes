import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseUrl = "http://localhost:3100/usuarios";

class Register extends Component {
  state = {
    form: {
      nombres: '',
      email: '',
      numero: '',
      password: '',
      confirmarPassword: '',
      rol: ' ', 
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

  registro = async (e) => {
    e.preventDefault();
    const { nombres, email, numero, password, confirmarPassword, rol } = this.state.form;

    if (password !== confirmarPassword) {
      this.setState({ error: "Las contraseñas no coinciden" });
      return;
    }

    if (!nombres || !email || !numero || !password || !rol) {
      this.setState({ error: "Todos los campos son obligatorios" });
      return;
    }

    try {
      await axios.post(baseUrl, {
        nombres,
        email,
        numero,
        password,
        rol,
      });
      alert("Se ha registrado en el sistema");
      window.location.href = "/login";
    } catch (error) {
      this.setState({ error: "Hubo un problema al registrarse. Inténtalo nuevamente." });
    }
  };

  render() {
    const { error, form } = this.state;

    return (
      <div>
        <nav className="bg-blue-500 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="#" className="text-white font-bold text-2xl">EmpresaTransporte</Link>
          </div>
        </nav>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="flex container mx-auto my-8 p-6 bg-white shadow-lg w-full md:w-2/5 justify-center items-center rounded-lg">
            <div className="w-full p-8">
              <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Registrarse</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={this.registro} className="space-y-6">
                <div>
                  <label htmlFor="nombres" className="block text-sm font-medium text-gray-600">Nombres</label>
                  <input type="text" id="nombres" name="nombres" value={form.nombres} onChange={this.handleChange} className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo electrónico</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={this.handleChange} className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
                <div>
                  <label htmlFor="numero" className="block text-sm font-medium text-gray-600">Número telefónico</label>
                  <input type="text" id="numero" name="numero" value={form.numero} onChange={this.handleChange} className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
                <div>
                  <label htmlFor="rol" className="block text-sm font-medium text-gray-600">Tipo de usuario</label>
                  <select id="rol" name="rol" value={form.rol} onChange={this.handleChange} className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="cliente">Cliente</option>
                    <option value="administrador">Administrador de camiones</option>
                    <option value="conductor">Conductor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
                  <input type="password" id="password" name="password" value={form.password} onChange={this.handleChange} className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
                <div>
                  <label htmlFor="confirmarPassword" className="block text-sm font-medium text-gray-600">Repetir contraseña</label>
                  <input type="password" id="confirmarPassword" name="confirmarPassword" value={form.confirmarPassword} onChange={this.handleChange} className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="terminos" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 bg-white" />
                  <label htmlFor="terminos" className="ml-2 block text-sm text-gray-700">Acepto los <Link to="#" className="text-blue-600 hover:underline">términos</Link></label>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-700">¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:underline">Click aquí</Link></p>
                </div>
                <div className="flex justify-center mt-6">
                  <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Registrarse</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
