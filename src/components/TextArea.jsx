function TextAreaInput({
  type,
  label,
  name,
  id,
  placeholder,
  value,
  onChange,
  error,
  errorText,
  ...props
}) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-gray-800 font-bold">
          {label}
        </label>
      )}
      <textarea
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        rows={5}
        onChange={onChange}
        className="w-full border border-gray-300 focus:border-primaryColor py-2 pl-3 rounded mt-2 outline-none focus:ring-primaryColor :ring-indigo-600"
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
}

export default TextAreaInput;
