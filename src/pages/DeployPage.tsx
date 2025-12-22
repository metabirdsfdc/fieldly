import CsvFormatGuide from "../components/CsvFormatGuide";
import CsvUpload from "../components/CsvUpload";
import OrgSessions from "../components/OrgSessions";
import DeployTabs from "./DeployTabs";

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-[#F6FFF8] text-neutral-900">
      <div
        className="
          mx-auto max-w-7xl
          px-4 sm:px-6 lg:px-8
          py-8 sm:py-12 lg:py-14
          flex flex-col
          min-h-screen
          gap-8 sm:gap-12
        "
      >
        <div className="flex-1 w-full">
          <DeployTabs>
            {(active) => {
              switch (active) {
                case "credentials":
                  return <OrgSessions />;
                case "guide":
                  return <CsvFormatGuide />;
                case "deploy":
                  return <CsvUpload />;
                default:
                  return null;
              }
            }}
          </DeployTabs>
        </div>

        <footer className="pt-6 sm:pt-8 text-center text-xs text-neutral-500">
          Developed by{" "}
          <span className="font-medium text-neutral-700">
            Suddala Pavan Kalyan
          </span>{" "}
          ·{" "}
          <a
            href="https://www.linkedin.com/in/suddalapavankalyan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-600 hover:underline"
          >
            LinkedIn
          </a>
        </footer>
      </div>
    </div>
  );
}
