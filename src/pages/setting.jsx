import AdminLayout from "@/layouts/AdminLayout";

const Setting = () => {
  return <div className="title">Setting</div>;
};

export default Setting;

Setting.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
