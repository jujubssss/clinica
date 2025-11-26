import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const PageWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-gray-900 text-gray-100 transition-all duration-300"
          : "min-h-screen bg-gray-100 text-gray-900 transition-all duration-300"
      }
    >
      {children}
    </div>
  );
};

export default PageWrapper;
