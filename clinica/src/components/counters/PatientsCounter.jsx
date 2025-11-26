import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaHospitalUser } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const PatientsCounter = () => {
  const [patientsCount, setPatientsCount] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios.get("http://localhost:3000/patients")
      .then(res => setPatientsCount(res.data.length))
      .catch(err => console.error("Erro ao obter pacientes:", err));
  }, []);

  return (
    <div
      className={`shadow rounded-lg p-6 flex flex-col items-center w-60 transition
      ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
    >
      <h2 className="text-xl font-bold flex items-center gap-2">
        <FaHospitalUser className="text-blue-500" /> {patientsCount}
      </h2>
      <p className="mt-2">Pacientes</p>
    </div>
  );
};

export default PatientsCounter;
