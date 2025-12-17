import CredentialsForm from "../components/CredentialsForm";
import CsvFormatGuide from "../components/CsvFormatGuide";
import CsvUpload from "../components/CsvUpload";

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex">
      <div className="py-20 max-w-6xl mx-auto px-4 flex flex-col flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          <div className="space-y-6">
            <CredentialsForm />
            <CsvUpload />
          </div>

          <div>
            <CsvFormatGuide />
          </div>
        </div>

        <div className="mt-auto border-t border-neutral-200 dark:border-neutral-800 pt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
          Developed by{" "}
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            Suddala Pavan Kalyan
          </span>{" "}
          ·{" "}
          <a
            href="https://www.linkedin.com/in/suddalapavankalyan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
