import { useState } from "react";

const tabs = [
  { id: "credentials", label: "Credentials" },
  { id: "guide", label: "CSV Guide" },
  { id: "deploy", label: "Deploy" }
];

export default function DeployTabs({ children }: any) {
  const [active, setActive] = useState("credentials");

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-6 border-b border-slate-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`pb-3 text-sm font-medium transition ${
              active === tab.id
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 pt-8">{children(active)}</div>
    </div>
  );
}
