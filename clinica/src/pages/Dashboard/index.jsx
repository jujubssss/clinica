import PageWrapper from "../../components/PageWrapper/PageWrapper";
import PatientsCounter from "../../components/counters/PatientsCounter";
import ConsultsCounter from "../../components/counters/ConsultsCounter";
import ExamsCounter from "../../components/counters/ExamsCounter";
import PatientsList from "../../components/PatientsList/PatientsList";

const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="p-6 overflow-y-auto">

        <h2 className="text-xl font-semibold mb-4">
          Estatísticas do Sistema
        </h2>

        <div className="flex gap-6 mb-6">
          <PatientsCounter />
          <ConsultsCounter />
          <ExamsCounter />
        </div>

        <PatientsList />
        
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
