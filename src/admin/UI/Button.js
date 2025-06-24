/**
 * A customizable Button component with support for multiple variants, sizes, loading state, and icons.
 *
 * @param {object} props - The props for the Button component.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'} [props.variant='primary'] - The visual style of the button.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button.
 * @param {boolean} [props.isLoading=false] - If true, shows a loading spinner and disables the button.
 * @param {React.ReactNode} [props.leftIcon] - Optional icon to display on the left side of the button.
 * @param {React.ReactNode} [props.rightIcon] - Optional icon to display on the right side of the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {boolean} [props.disabled] - If true, disables the button.
 * @param {...object} props - Additional props are spread onto the underlying button element.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-blue-900 hover:bg-blue-800 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    outline:
      "border border-blue-900 text-blue-900 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-blue-900 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizeStyles = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current\"
          xmlns="http://www.w3.org/2000/svg\"
          fill="none\"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25\"
            cx="12\"
            cy="12\"
            r="10\"
            stroke="currentColor\"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
