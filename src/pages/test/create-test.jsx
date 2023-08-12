import AdminLayout from "@/components/layouts/AdminLayout";

const CreateTest = () => {
  return <div className="title">Create Test</div>;
};

export default CreateTest;

CreateTest.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
