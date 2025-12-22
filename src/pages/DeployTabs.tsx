import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export type TabId = "credentials" | "guide" | "deploy";

const tabs: readonly { id: TabId; label: string }[] = [
  { id: "credentials", label: "Credentials" },
  { id: "guide", label: "CSV Guide" },
  { id: "deploy", label: "Deploy" }
];

type DeployTabsProps = {
  defaultTab?: TabId;
  children: (active: TabId) => React.ReactNode;
};

export default function DeployTabs({
  defaultTab = "credentials",
  children
}: DeployTabsProps) {
  const [active, setActive] = useState<TabId>(defaultTab);

  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    credentials: null,
    guide: null,
    deploy: null
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const updatePill = () => {
    const el = tabRefs.current[active];
    const container = scrollRef.current;
    if (!el || !container) return;

    setPill({
      left: el.offsetLeft - container.scrollLeft,
      width: el.offsetWidth
    });
  };

  useEffect(() => {
    updatePill();

    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updatePill);
    window.addEventListener("resize", updatePill);

    return () => {
      container.removeEventListener("scroll", updatePill);
      window.removeEventListener("resize", updatePill);
    };
  }, [active]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-center">
        <div
          ref={scrollRef}
          className="relative w-full sm:w-auto overflow-x-auto"
        >
          <div className="relative flex items-center rounded-2xl bg-[#F6FFF8] px-3 sm:px-7 py-2.5 min-w-max mx-auto">
            <span
              className="absolute top-1 bottom-1 rounded-xl bg-yellow-200 transition-all duration-300 ease-out"
              style={{ left: pill.left, width: pill.width }}
            />

            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                onClick={() => setActive(tab.id)}
                className={clsx(
                  "relative z-10 px-4 sm:px-7 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-colors",
                  active === tab.id
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 pt-6 sm:pt-10 w-full overflow-x-hidden">
        {children(active)}
      </div>
    </div>
  );
}
