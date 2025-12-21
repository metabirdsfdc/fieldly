export const InputField = ({ icon, ...props }: any) => (
  <div
    className="
      flex items-center gap-2
      border border-slate-300 rounded-xl
      px-3 py-2
      focus-within:border-blue-600
      transition
      bg-white
    "
  >
    <input
      {...props}
      className="
        flex-1 bg-transparent text-sm
        outline-none
        placeholder:text-slate-400
      "
    />
    {icon}
  </div>
);
