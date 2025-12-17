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
        `https://fieldler.onrender.com/request/deploy/csv`,
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
    <div className="border border-gray-300 p-4 rounded-md">
      <h2 className="text-sm font-semibold mb-3">CSV Deploy</h2>

      <div className="space-y-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          disabled={status === "loading"}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm"
        />

        <button
          onClick={upload}
          disabled={status === "loading"}
          className="border border-gray-400 px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
        >
          {status === "loading" ? "Deploying…" : "Upload & Deploy"}
        </button>

        {status !== "idle" && (
          <p
            className={`text-xs ${
              status === "error"
                ? "text-red-600"
                : status === "success"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
