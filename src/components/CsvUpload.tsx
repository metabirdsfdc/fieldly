import { useEffect, useRef, useState } from "react";
import { uploadApi } from "../api/upload.api";
import { PrimaryButton } from "../components/ui/Buttons";

type Status = "idle" | "loading" | "success" | "error";

export default function CsvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const upload = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Select a CSV file to continue");
      return;
    }

    setStatus("loading");
    setMessage("Deploying CSV…");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await uploadApi.post("/request/v1/deploy/csv", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const data = res.data;

      setStatus("success");
      setMessage(data?.message || "Deployment completed successfully");
      reset();
    } catch (error: any) {
      setStatus("error");

      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Network or server error";

      setMessage(errorMessage);
      reset();
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <section className="w-full max-w-xl rounded-2xl bg-[#F6FFF8] p-4 md:p-8 space-y-6">
        <header className="space-y-1">
          <h2 className="text-sm font-medium text-slate-900">Deploy CSV</h2>
          <p className="text-xs text-slate-600">
            Upload a properly formatted CSV to deploy metadata.
          </p>
        </header>

        <label
          htmlFor="csv"
          className={`flex flex-col items-center justify-center gap-2 rounded-xl p-6 cursor-pointer transition
            border border-dashed ${
              status === "loading"
                ? "border-slate-300 bg-slate-50"
                : "border-yellow-200 hover:border-yellow-400"
            }`}
        >
          <input
            ref={inputRef}
            id="csv"
            type="file"
            accept=".csv"
            disabled={status === "loading"}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <span className="text-sm text-slate-700">
            {file ? file.name : "Click to upload CSV"}
          </span>
          <span className="text-xs text-slate-500">
            {file
              ? `${(file.size / 1024).toFixed(1)} KB`
              : "Only .csv files are supported"}
          </span>
        </label>

        <PrimaryButton
          className="sm:w-auto w-full"
          onClick={upload}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Deploying…" : "Upload & Deploy"}
        </PrimaryButton>

        {status !== "idle" && (
          <p
            className={`text-xs ${
              status === "success"
                ? "text-green-600"
                : status === "error"
                ? "text-red-600"
                : "text-slate-600"
            }`}
          >
            {message}
          </p>
        )}
      </section>
    </div>
  );
}
