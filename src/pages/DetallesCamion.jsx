import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseUrl = "http://localhost:3100/camiones";

class DetallesCamion extends Component {
  state = {
    camiones: []
  };

  componentDidMount() {
    if (!cookies.get('id')) {
      window.location.href = "/login";
    } else {
      this.obtenerCamiones();
    }
  }

  obtenerCamiones = async () => {
    try {
      const response = await axios.get(baseUrl);
      this.setState({ camiones: response.data });
    } catch (error) {
      console.error("Error al obtener los camiones:", error);
    }
  };

  render() {
    const { camiones } = this.state;
    const nombre = cookies.get('nombres');
    const email = cookies.get('email');

    console.log('id: ' + cookies.get('id'));
    console.log('nombres: ' + nombre);
    console.log('email: ' + email);
    
    return (
      <div>
        <nav className="bg-blue-500 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/inicio" className="text-white font-bold text-2xl">EmpresaTransporte</Link>
            <div className="space-x-4">
              <Link to="/inicio" className="text-white hover:bg-blue-700 py-2 px-4 rounded transition duration-300">Inicio</Link>
              <Link to="/perfil" className="text-white hover:bg-blue-700 py-2 px-4 rounded transition duration-300">Perfil</Link>
            </div>
          </div>
        </nav>
        <div className="container mx-auto my-8 p-6 bg-white shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Detalles de los Camiones</h1>
          {camiones.length > 0 ? (
            camiones.map(camion => (
              <div key={camion.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                <p className="text-lg text-gray-700">Matrícula: {camion.matricula}</p>
                <p className="text-lg text-gray-700">Marca: {camion.marca}</p>
                <p className="text-lg text-gray-700">Capacidad: {camion.capacidad}kg</p>
                <p className="text-lg text-gray-700">Consumo: {camion.consumo}L/100km</p>
                <p className="text-lg text-gray-700">Carga Actual: {camion.carga_actual}kg</p>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700 text-center">No hay camiones registrados.</p>
          )}
          <div className="flex space-x-4 mt-6">
            <Link to="/cargarcamion">
              <button type="button" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Cargar camión</button>
            </Link>
            <Link to="/inicio">
              <button type="button" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Volver</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default DetallesCamion;