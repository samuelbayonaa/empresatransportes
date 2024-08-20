import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Perfil extends Component {
  cerrarSesion = () => {
    cookies.remove('id', { path: "/" });
    cookies.remove('nombres', { path: "/" });
    cookies.remove('email', { path: "/" });
    cookies.remove('numero', { path: "/" });
    cookies.remove('rol', { path: "/" });


    window.location.href = "/login";
  };

  componentDidMount() {
    if (!cookies.get('id')) {
      window.location.href = "/register";
    }
  }

  render() {
    const nombre = cookies.get('nombres');
    const email = cookies.get('email');
    const rol = cookies.get('rol');


    return (
      <div>
        <nav className="bg-blue-500 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/inicio" className="text-white font-bold text-2xl">EmpresaTransporte</Link>
            <div className="space-x-4">
              <Link to="/inicio" className="text-white hover:bg-blue-700 py-2 px-4 rounded transition duration-300">Inicio</Link>
              <Link to="/login" className="text-white hover:bg-blue-700 py-2 px-4 rounded transition duration-300">Iniciar sesión</Link>
              <Link to="/perfil" className="text-white hover:bg-blue-700 py-2 px-4 rounded transition duration-300">Perfil</Link>
            </div>
          </div>
        </nav>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="flex container mx-auto my-8 p-6 bg-white shadow-lg w-full md:w-2/5 justify-center items-center rounded-lg">
            <div className="w-full p-8">
              <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Perfil</h2>
              <div className="flex justify-center mb-6">
                <img
                  src="src/img/profile.jpg"
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full border border-gray-300"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Nombre</h3>
                  <p className="text-gray-600">{nombre}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Correo Electrónico</h3>
                  <p className="text-gray-600">{email}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Rol</h3>
                  <p className="text-gray-600">{rol}</p>
                </div>
                <br />
                <div className="flex space-x-4 mt-6">
                  <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Editar perfil</button>
                  <button
                    type="button"
                    className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={this.cerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                  <Link to="/inicio">
                    <button type="button" className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500">Volver</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;
