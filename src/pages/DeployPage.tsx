import CredentialsForm from "../components/CredentialsForm";
import CsvFormatGuide from "../components/CsvFormatGuide";
import CsvUpload from "../components/CsvUpload";

export default function DeployPage() {
  return (
    <div className="min-h-screen py-20 max-w-6xl mx-auto px-4 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        <div className="space-y-6">
          <CredentialsForm />
          <CsvUpload />
        </div>

        <div>
          <CsvFormatGuide />
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
        Developed by{" "}
        <span className="font-medium text-gray-700">Suddala Pavan Kalyan</span>{" "}
        ·{" "}
        <a
          href="https://www.linkedin.com/in/suddalapavankalyan/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
