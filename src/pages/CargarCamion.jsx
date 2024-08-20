import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3100/camiones";
const cookies = new Cookies();

class CargarCamion extends Component {
  componentDidMount() {
    if (!cookies.get('id')) {
      window.location.href = "/login";
    }
  }

  state = {
    form: {
      matricula: '',
      marca: '',
      capacidad: '',
      consumo: '',
      carga_actual: ''
    },
  }

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  cargarCamion = async (e) => {
    e.preventDefault();
    const { matricula, marca, capacidad, consumo, carga_actual } = this.state.form;

    try {
      await axios.post(baseUrl, {
        matricula,
        marca,
        capacidad,
        consumo,
        carga_actual
      });
      alert("Camión registrado con éxito");
      window.location.href = "/detallescamion";
    } catch (error) {
      this.setState({ error: "Hubo un problema al registrar el camión. Inténtalo nuevamente." });
    }
  }

  render() {
    const { error } = this.state;

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
        <div className="container mx-auto my-8 p-6 bg-white shadow-lg w-full md:w-2/5 justify-center items-center rounded-lg">
          <h2 className="text-3xl font-extrabold mb-6 bg-white text-center text-gray-800">Cargar Camión</h2>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <form onSubmit={this.cargarCamion} className="space-y-6">
            <div>
              <label htmlFor="matricula" className="block text-sm font-medium text-gray-600">Matrícula</label>
              <input
                type="text"
                id="matricula"
                name="matricula"
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="marca" className="block text-sm font-medium text-gray-600">Marca</label>
              <input
                type="text"
                id="marca"
                name="marca"
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="capacidad" className="block text-sm font-medium text-gray-600">Capacidad (kg)</label>
              <input
                type="text"
                id="capacidad"
                name="capacidad"
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="consumo" className="block text-sm font-medium text-gray-600">Consumo Gasolina</label>
              <input
                type="text"
                id="consumo"
                name="consumo"
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="carga_actual" className="block text-sm font-medium text-gray-600">Carga actual</label>
              <input
                type="text"
                id="carga_actual"
                name="carga_actual"
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex space-x-4 mt-6">  
            <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Cargar camión</button> 
            <Link to ="/detallescamion">
            <button type=" " className="py-2 px-4 bg-black text-white rounded-lg hover:bg-white-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-black-500">volver</button>
            </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CargarCamion;
