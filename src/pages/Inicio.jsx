import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseUrl = "http://localhost:3100/camiones";

class Inicio extends Component {

  state = {
    camiones:[]
    
  };

  componentDidMount() {
    if (!cookies.get('id')) {
      window.location.href = "/login";
    } else{
      this.obtenerCamiones();
    }
  }

  obtenerCamiones = async () => {
    try{
      const response = await axios.get(baseUrl);
      this.setState({camiones: response.data});
    }catch (error){
      console.error("Error al obtener los camiones:", error);
    }
  };


  render() {
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
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
          <h1 className="text-3xl font-bold mb-6">Gestión de Camiones</h1>
          <input
            type="search"
            placeholder="Buscar mejor camión por carga"
            className="mb-6 p-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md"
          />
      
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
            <Link to="/detallescamion" className="w-full sm:w-1/2 lg:w-1/3 block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="src/img/mula.jpg" alt="Camión" className="w-full h-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Matrícula: </h2>
              <p>Marca:</p>
              <p>Capacidad: </p>
              <p>Consumo: </p>
              <p>Carga Actual: </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
