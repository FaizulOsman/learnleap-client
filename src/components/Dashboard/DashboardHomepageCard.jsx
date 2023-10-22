const DashboardHomepageCard = ({ icon, title, count }) => {
  return (
    <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
      <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-2xl">{count > 0 ? count : 0}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default DashboardHomepageCard;
