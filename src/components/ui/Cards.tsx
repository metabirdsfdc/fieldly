export const Card = ({ title, children }: any) => (
  <section className="border border-slate-300 rounded-xl bg-white p-6">
    {title && (
      <h2 className="text-sm font-medium text-slate-900 mb-4">{title}</h2>
    )}
    {children}
  </section>
);
