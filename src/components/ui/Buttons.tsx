import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex w-full items-center justify-center rounded-xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50",
        className
      )}
    />
  );
}

export function OutlineButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2",
        className
      )}
    />
  );
}
