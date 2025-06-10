/**
 * StatCard component displays a single statistical summary card with an icon, title, value, and optional increase percentage.
 *
 * @component
 * @param {Object} props
 * @param {string} props.title - The title of the statistic.
 * @param {number|string} props.value - The value to display.
 * @param {React.ReactNode} props.icon - The icon to display in the card.
 * @param {string} props.color - Tailwind CSS color class for the icon background.
 * @param {string} [props.increase] - Optional percentage increase to display.
 * @param {string} props.url - The URL to navigate to when the card is clicked.
 * @returns {JSX.Element} The rendered StatCard component.
 */

/**
 * StatsSummary component displays a grid of statistical summary cards for the admin dashboard.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.data - The data object containing statistics.
 * @param {number|string} props.data.products - Total number of products.
 * @param {number|string} props.data.system_users - Total number of system users.
 * @param {number|string} props.data.quotations - Total number of quotations.
 * @param {number|string} props.data.approved_dealers - Total number of approved dealers.
 * @returns {JSX.Element} The rendered StatsSummary component.
 */
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
