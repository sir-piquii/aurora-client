/**
 * FormField is a reusable input component for forms.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.name - The name and id for the input field.
 * @param {string|number} props.value - The current value of the input field.
 * @param {function} props.onChange - Callback function to handle input changes.
 * @param {string} [props.error] - Optional error message to display below the input.
 * @param {string} [props.type="text"] - The type of the input (e.g., "text", "email", "password").
 * @param {boolean} [props.required=false] - Whether the field is required.
 * @returns {JSX.Element} The rendered form field component.
 */
const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required = false,
}) => {
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border ${
          error
            ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
            : "border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500"
        } rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200 dark:text-white`}
        required={required}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormField;
