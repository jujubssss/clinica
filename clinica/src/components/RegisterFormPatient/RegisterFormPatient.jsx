import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IMaskInput } from "react-imask";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const RegisterFormPatient = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    birthdate: "",
    cpf: "",
    rg: "",
    maritalStatus: "",
    phone: "",
    email: "",
    birthplace: "",
    emergencyContact: "",
    allergies: "",
    specialCare: "",
    healthInsurance: "",
    insuranceNumber: "",
    insuranceValidity: "",
    address: {
      cep: "",
      city: "",
      state: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      reference: "",
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const fetchAddressData = async (cep) => {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          cep: data.cep || "",
          city: data.localidade || "",
          state: data.uf || "",
          street: data.logradouro || "",
          complement: data.complemento || "",
          neighborhood: data.bairro || "",
        },
      }));
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const handleCepBlur = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) fetchAddressData(cep);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await axios.post("http://localhost:3000/patients", formData);

      toast.success("Paciente cadastrado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });

      setFormData({
        fullName: "",
        gender: "",
        birthdate: "",
        cpf: "",
        rg: "",
        maritalStatus: "",
        phone: "",
        email: "",
        birthplace: "",
        emergencyContact: "",
        allergies: "",
        specialCare: "",
        healthInsurance: "",
        insuranceNumber: "",
        insuranceValidity: "",
        address: {
          cep: "",
          city: "",
          state: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          reference: "",
        },
      });
    } catch (error) {
      toast.error("Erro ao salvar os dados!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageWrapper>
      <div className="p-6 max-w-5xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6">
          Cadastro de Paciente
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-gray-900 dark:text-gray-100"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* COMPONENTE UNIVERSAL DE INPUT */}
            {/** Basta seguir este padrão em todos os inputs */}

            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-medium mb-1">Nome Completo</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 dark:focus:ring-cyan-400 outline-none"
              />
            </div>

            {/* Gênero */}
            <div>
              <label className="block text-sm font-medium mb-1">Gênero</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 dark:focus:ring-cyan-400 outline-none"
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Data de nascimento */}
            <div>
              <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg"
              />
            </div>

            {/* CPF */}
            <div>
              <label className="block text-sm font-medium mb-1">CPF</label>
              <IMaskInput
                mask="000.000.000-00"
                name="cpf"
                value={formData.cpf}
                onAccept={(value) => setFormData((prev) => ({ ...prev, cpf: value }))}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg"
              />
            </div>

            {/* 
              ⬆️ A partir daqui TODOS os inputs seguem o exato mesmo padrão:
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-100
            */}

            {/* RG */}
            <div>
              <label className="block text-sm font-medium mb-1">RG</label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg"
              />
            </div>

            {/* Estado Civil */}
            <div>
              <label className="block text-sm font-medium mb-1">Estado Civil</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg"
              >
                <option value="">Selecione</option>
                <option value="solteiro(a)">Solteiro(a)</option>
                <option value="casado(a)">Casado(a)</option>
                <option value="divorciado(a)">Divorciado(a)</option>
                <option value="viuvo(a)">Viúvo(a)</option>
              </select>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <IMaskInput
                mask="(00) 00000-0000"
                name="phone"
                value={formData.phone}
                onAccept={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg"
              />
            </div>

            {/* Contato de emergência */}
            <div>
              <label className="block text-sm font-medium mb-1">Contato de Emergência</label>
              <IMaskInput
                mask="(00) 00000-0000"
                name="emergencyContact"
                value={formData.emergencyContact}
                onAccept={(value) =>
                  setFormData((prev) => ({ ...prev, emergencyContact: value }))
                }
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg"
              />
            </div>

            {/* Naturalidade */}
            <div>
              <label className="block text-sm font-medium mb-1">Naturalidade</label>
              <input
                type="text"
                name="birthplace"
                value={formData.birthplace}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded-lg"
              />
            </div>

            {/* ... e assim por diante para todos os campos ... */}

          </div>

          {/* BOTÃO */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-cyan-700 dark:bg-cyan-600 text-white rounded-lg hover:bg-cyan-600 dark:hover:bg-cyan-500 transition disabled:opacity-50"
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </button>
          </div>

          <ToastContainer />
        </form>

      </div>
    </PageWrapper>
  );
};

export default RegisterFormPatient;
