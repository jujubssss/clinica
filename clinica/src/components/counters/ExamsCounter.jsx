import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaCalendarPlus } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const ExamsCounter = () => {
  const [examsCount, setExamsCount] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/exams");
        setExamsCount(response.data.length);
      } catch (error) {
        console.error("Erro ao obter dados dos exames:", error);
      }
    };

    fetchExams();
  }, []);

  return (
    <div
      className={`
        shadow rounded-lg p-6 flex flex-col items-center w-60 transition-all duration-300
        ${theme === "dark" 
          ? "bg-gray-800 text-gray-100" 
          : "bg-white text-gray-900"
        }
      `}
    >
      <h2 className="text-xl font-bold flex items-center gap-2">
        <FaCalendarPlus className="text-purple-500" /> {examsCount}
      </h2>
      <p className="mt-2 opacity-80">Exames</p>
    </div>
  );
};

export default ExamsCounter;
