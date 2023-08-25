import AdminLayout from "@/layouts/AdminLayout";

const Order = () => {
  return <div className="title">Order</div>;
};

export default Order;

Order.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
