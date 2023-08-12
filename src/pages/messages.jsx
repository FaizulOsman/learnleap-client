import AdminLayout from "@/components/layouts/AdminLayout";

const Messages = () => {
  return <div className="title">Messages</div>;
};

export default Messages;

Messages.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
