import CsvFormatGuide from "../components/CsvFormatGuide";
import CsvUpload from "../components/CsvUpload";
import OrgSessions from "../components/OrgSessions";
import DeployTabs from "./DeployTabs";

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="md:max-w-9xl mx-auto md:px-6 py-12 flex flex-col min-h-screen gap-10">
        <section className="flex-1 bg-white p-5 sm:p-8">
          <DeployTabs>
            {(active: string) => {
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
        </section>

        <footer className="pt-6 text-center text-xs text-neutral-500">
          Developed by{" "}
          <span className="font-medium text-neutral-700">
            Suddala Pavan Kalyan
          </span>{" "}
          ·{" "}
          <a
            href="https://www.linkedin.com/in/suddalapavankalyan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        </footer>
      </div>
    </div>
  );
}
