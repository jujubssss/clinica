import { Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import SideMenu from "../components/SideMenu/SideMenu";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      
      {/* Barra lateral */}
      <SideMenu />

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className={`flex justify-between items-center p-4 shadow 
          ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          
          <h1 className="text-xl font-bold text-cyan-500">Painel do Sistema</h1>

          <div className="flex items-center gap-4">

            {/* Botão Dark/Light Mode */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "light" ? "Modo Escuro" : "Modo Claro"}
            </button>

            {/* Usuário logado */}
            {user && (
              <>
                <span className="opacity-80">Bem-vindo, {user.email}</span>

                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Sair
                </button>
              </>
            )}

          </div>
        </header>

        {/* Área das páginas internas */}
        <section className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
