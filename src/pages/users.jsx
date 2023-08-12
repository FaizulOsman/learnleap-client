import AdminLayout from "@/components/layouts/AdminLayout";

const Users = () => {
  return <div className="title">All Users</div>;
};

export default Users;

Users.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
