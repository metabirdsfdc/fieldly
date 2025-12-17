import { useRef, useState } from "react";

type StatusType = "idle" | "loading" | "success" | "error";

export default function CsvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");
  const [message, setMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const clearFileInput = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const upload = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Please select a CSV file");
      return;
    }

    setStatus("loading");
    setMessage("Deploying CSV…");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `https://fieldler.onrender.com/request/v1/deploy/csv`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error || "Deployment failed");
        clearFileInput();
        return;
      }

      setStatus("success");
      setMessage("Deployment completed successfully");
      clearFileInput();

      timeoutRef.current = window.setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch {
      setStatus("error");
      setMessage("Network or server error");
      clearFileInput();
    }
  };

  return (
    <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <h2 className="text-sm font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
        CSV Deploy
      </h2>

      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          disabled={status === "loading"}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm text-neutral-700 dark:text-neutral-300
                     file:border file:border-neutral-300 dark:file:border-neutral-700
                     file:bg-neutral-100 dark:file:bg-neutral-800
                     file:px-3 file:py-1 file:rounded-md
                     hover:file:bg-neutral-200 dark:hover:file:bg-neutral-700
                     transition"
        />

        <button
          onClick={upload}
          disabled={status === "loading"}
          className="rounded-md border border-neutral-400 dark:border-neutral-600
                     px-3 py-1 text-sm
                     hover:bg-neutral-100 dark:hover:bg-neutral-800
                     transition disabled:opacity-50"
        >
          {status === "loading" ? "Deploying…" : "Upload & Deploy"}
        </button>

        {status !== "idle" && (
          <p
            className={`text-xs ${
              status === "error"
                ? "text-red-600 dark:text-red-400"
                : status === "success"
                ? "text-green-600 dark:text-green-400"
                : "text-neutral-600 dark:text-neutral-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
