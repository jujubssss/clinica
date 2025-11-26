import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css'

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from "./context/ThemeContext";  // <-- ADICIONADO

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import DashboardLayout from './layouts/DashboardLayout';

import MedicalRecordList from './components/MedicalRecordList/MedicalRecordList';
import RegisterFormPatient from './components/RegisterFormPatient/RegisterFormPatient';
import ConsultationForm from './components/ConsultationForm/ConsultationForm';
import ExamsForm from './components/ExamsForm/ExamsForm';


// ------------------ ROTAS ------------------
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  
  {
    element: (
      <PrivateRoute>
        <DashboardLayout/>
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/prontuarios", element: <MedicalRecordList/> },
      { path: "/pacientes", element: <RegisterFormPatient/> },
      { path: "/consultas", element: <ConsultationForm/> },
      { path: "/exames", element: <ExamsForm /> },
    ],
  },
]);


// ------------------ RENDER ------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>   {/* <-- ENVOLVE TUDO PARA O DARK MODE FUNCIONAR */}
        <ToastContainer />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
