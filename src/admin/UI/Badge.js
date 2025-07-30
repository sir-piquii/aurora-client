/**
 * Badge component for displaying status or labels with different visual variants.
 *
 * @param {Object} props - Component props.
 * @param {'default'|'success'|'warning'|'danger'|'info'} [props.variant='default'] - Visual style of the badge.
 * @param {React.ReactNode} props.children - Content to display inside the badge.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the badge.
 * @returns {JSX.Element} The rendered badge component.
 */
const Badge = ({ variant = "default", children, className = "" }) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
