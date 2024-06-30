function InputText({
  type,
  label,
  name,
  id,
  placeholder,
  value,
  onChange,
  error,
  errorText,
  disabled,
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-gray-800 font-bold">
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 focus:border-primaryColor py-2 px-3 rounded mt-2 outline-none focus:ring-primaryColor :ring-indigo-600"
      />
      {error && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
}

export default InputText;
