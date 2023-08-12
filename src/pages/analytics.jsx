import AdminLayout from "@/components/layouts/AdminLayout";

const Analytics = () => {
  return <div className="title"> Analytics</div>;
};

export default Analytics;

Analytics.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
