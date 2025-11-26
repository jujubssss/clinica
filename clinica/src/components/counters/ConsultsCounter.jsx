import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaCalendarCheck } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const ConsultsCounter = () => {
  const [consultsCount, setConsultsCount] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios.get("http://localhost:3000/consults")
      .then(res => setConsultsCount(res.data.length))
      .catch(err => console.error("Erro ao obter consultas:", err));
  }, []);

  return (
    <div
      className={`shadow rounded-lg p-6 flex flex-col items-center w-60 transition
      ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
    >
      <h2 className="text-xl font-bold flex items-center gap-2">
        <FaCalendarCheck className="text-green-500" /> {consultsCount}
      </h2>
      <p className="mt-2">Consultas</p>
    </div>
  );
};

export default ConsultsCounter;
