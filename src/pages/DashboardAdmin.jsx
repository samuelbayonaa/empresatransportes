import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardAdmin = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Bienvenido, {user.nombres} ({user.rol})</p>

      {user.rol === 'administrador' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Gestión de Camiones</h2>
          {/* Aquí podrías mostrar estadísticas, asignaciones, etc. */}
        </div>
      )}

      {user.rol === 'conductor' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Rutas Asignadas</h2>
          {/* Aquí podrías mostrar las rutas asignadas y el estado de los camiones */}
        </div>
      )}

      {user.rol === 'cliente' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Mis Pedidos</h2>
          {/* Aquí podrías mostrar el estado de los pedidos, tracking, etc. */}
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
