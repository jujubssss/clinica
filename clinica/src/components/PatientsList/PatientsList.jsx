import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";
import { ThemeContext } from "../../context/ThemeContext";

const PatientsList = ({ filter = "todos" }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ages, setAges] = useState({});

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/patients");
        const patientsData = response.data;

        const calculatedAges = {};
        patientsData.forEach((patient) => {
          calculatedAges[patient.id] = calculateAge(patient.birthdate);
        });

        setAges(calculatedAges);
        setPatients(patientsData);
      } catch (error) {
        console.error("Erro ao obter dados dos pacientes:", error);
      }
    };

    fetchPatients();
  }, []);

  const calculateAge = (birthdate) => {
    if (!birthdate) return "-";
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    let age = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 🔥 NOVO: FILTRO POR STATUS / PLANO / ETC
  const applyFilter = (patient) => {
    if (filter === "todos") return true;

    // Se você quiser filtrar por status:
    if (patient.status?.toLowerCase() === filter.toLowerCase()) return true;

    // Se quiser filtrar por plano de saúde:
    if (patient.healthInsurance?.toLowerCase() === filter.toLowerCase()) return true;

    return false;
  };

  // 🔥 FILTRAGEM FINAL (busca + filtro escolhido)
  const filteredPatients = patients
    .filter(applyFilter)
    .filter((patient) =>
      [patient.fullName, patient.email, patient.phone]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <div
      className="
        bg-white dark:bg-gray-800
        shadow rounded-2xl p-6 mt-8
        text-gray-900 dark:text-gray-100
      "
    >
      <h2 className="text-xl font-semibold text-cyan-800 dark:text-cyan-300 mb-4">
        Informações Rápidas de Pacientes
      </h2>

      {/* Campo de busca */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <label className="text-gray-700 dark:text-gray-300 font-medium">
          Buscar Paciente:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Digite o nome, email ou telefone"
          className="
            border rounded-lg px-3 py-2 w-full sm:w-80
            focus:ring-2 focus:ring-cyan-600
            outline-none
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            border-gray-300 dark:border-gray-600
          "
        />
      </div>

      {/* Lista de pacientes */}
      {filteredPatients.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredPatients.map((patient) => (
            <li
              key={patient.id}
              className="
                flex flex-col sm:flex-row sm:items-center justify-between py-4
              "
            >
              <div className="flex items-center gap-4">
                <div className="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 p-3 rounded-full">
                  <FaUserAlt size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {patient.fullName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {patient.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {patient.phone}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-0 text-right">
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    Idade:
                  </strong>{" "}
                  {ages[patient.id] || "-"} anos
                </p>
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">
                    Plano:
                  </strong>{" "}
                  {patient.healthInsurance || "—"}
                </p>
                <Link
                  to={`/paciente/${patient.id}`}
                  className="text-cyan-700 dark:text-cyan-300 font-semibold hover:underline"
                >
                  Ver detalhes →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-6">
          Nenhum paciente encontrado.
        </p>
      )}
    </div>
  );
};

export default PatientsList;
