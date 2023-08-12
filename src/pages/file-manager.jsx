import AdminLayout from "@/components/layouts/AdminLayout";

const FileManager = () => {
  return <div className="title">File Manager</div>;
};

export default FileManager;

FileManager.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
