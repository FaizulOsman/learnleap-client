import AdminLayout from "@/layouts/AdminLayout";

const Dashboard = () => {
  return <div className="title">Dashboard </div>;
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
