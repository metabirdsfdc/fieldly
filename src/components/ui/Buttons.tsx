export const PrimaryButton = ({ children, ...props }: any) => (
  <button
    {...props}
    className="
      w-full py-2.5 rounded-xl text-sm font-medium
      bg-blue-600 text-white
      hover:bg-blue-700
      active:bg-blue-800
      transition
      disabled:opacity-50
    "
  >
    {children}
  </button>
);

export const OutlineButton = ({ children, ...props }: any) => (
  <button
    {...props}
    className="
      w-full py-2.5 rounded-xl text-sm font-medium
      border border-slate-300 text-slate-700
      hover:bg-slate-100
      transition
    "
  >
    {children}
  </button>
);
