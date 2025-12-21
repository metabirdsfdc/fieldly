export const Status = ({ type, text }: any) => (
  <p
    className={`text-xs ${
      type === "success"
        ? "text-green-600"
        : type === "error"
        ? "text-red-600"
        : "text-slate-600"
    }`}
  >
    {text}
  </p>
);
