import { Users, ShoppingBag, ClipboardList, Award } from "lucide-react";
const StatCard = ({ title, value, icon, color, increase, url }) => {
  return (
    <a
      href={url}
      className="bg-white rounded-xl shadow-sm cursor-pointer p-6 transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-center">
        <div
          className={`h-12 w-12 rounded-lg ${color} flex items-center justify-center`}
        >
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">{value}</h2>
        </div>
      </div>
    </a>
  );
};
const StatsSummary = ({ data }) => {
  const stats = [
    {
      title: "Total Products",
      url: "/admin/products",
      value: data.products,
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
      increase: "12%",
    },
    {
      title: "System Users",
      url: "/admin/user-management",
      value: data.system_users,
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-green-500",
      increase: "8%",
    },
    {
      title: "Quotations",
      url: "/admin/quotations",
      value: data.quotations,
      icon: <ClipboardList className="h-6 w-6 text-white" />,
      color: "bg-purple-500",
      increase: "5%",
    },
    {
      title: "Approved Dealers",
      url: "/admin/dealers",
      value: data.approved_dealers,
      icon: <Award className="h-6 w-6 text-white" />,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsSummary;
