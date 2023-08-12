import AdminLayout from "@/components/layouts/AdminLayout";

const Setting = () => {
  return <div className="title">Setting</div>;
};

export default Setting;

Setting.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
