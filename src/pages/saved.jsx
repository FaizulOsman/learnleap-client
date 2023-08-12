import AdminLayout from "@/components/layouts/AdminLayout";

const Saved = () => {
  return <div className="title">Saved</div>;
};

export default Saved;

Saved.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
