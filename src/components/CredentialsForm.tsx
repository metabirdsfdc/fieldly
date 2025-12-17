import axios from "axios";
import { useEffect, useRef, useState } from "react";

type Credentials = {
  username: string;
  password: string;
  securityToken: string;
};

const EMPTY_FORM: Credentials = {
  username: "",
  password: "",
  securityToken: ""
};

type MessageType = "success" | "error" | "";

const API = axios.create({
  baseURL: "https://fieldler.onrender.com",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false
});

export default function CredentialsForm() {
  const [form, setForm] = useState<Credentials>(EMPTY_FORM);
  const [saved, setSaved] = useState<Credentials | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [showFormToken, setShowFormToken] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("");

  const timeoutRef = useRef<number | null>(null);

  const clearMessageAfterDelay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  useEffect(() => {
    API.get("/request/v1/credentials")
      .then((res) => {
        if (res.data?.username) {
          setSaved(res.data);
        } else {
          setSaved(null);
        }
      })
      .catch(() => setSaved(null));
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    try {
      await API.post("/request/v1/credentials", form);
      setSaved(form);
      setForm(EMPTY_FORM);
      setMessage("Credentials saved successfully");
      setMessageType("success");
      clearMessageAfterDelay();
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to save credentials");
      setMessageType("error");
    }
  };

  const clear = async () => {
    setMessage("");
    setMessageType("");

    try {
      await API.delete("/request/v1/credentials");
      setSaved(null);
      setShowPassword(false);
      setShowToken(false);
      setMessage("Credentials cleared");
      setMessageType("success");
      clearMessageAfterDelay();
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to clear credentials");
      setMessageType("error");
    }
  };

  return (
    <div className="space-y-6 text-neutral-900 dark:text-neutral-100">
      {saved && (
        <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800">
          <h2 className="text-sm font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
            Saved Credentials
          </h2>

          <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            <div>
              <span className="font-medium">Username:</span> {saved.username}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Password:</span>
              <span className="font-mono tracking-wider">
                {showPassword ? saved.password : "••••••••"}
              </span>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Security Token:</span>
              <span className="font-mono tracking-wider">
                {showToken ? saved.securityToken : "••••••••"}
              </span>
              <button
                type="button"
                onClick={() => setShowToken((v) => !v)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showToken ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="button"
              onClick={clear}
              className="mt-3 border border-red-400 dark:border-red-500 text-red-600 dark:text-red-400 px-3 py-1 rounded-md text-xs hover:bg-red-50 dark:hover:bg-red-950 transition"
            >
              Clear Credentials
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={submit}
        className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-900"
      >
        <h2 className="text-sm font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
          Save / Update Credentials
        </h2>

        <div className="space-y-3">
          <input
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-1 text-sm"
            placeholder="Username"
            autoComplete="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <div className="flex items-center gap-2">
            <input
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-1 text-sm"
              type={showFormPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowFormPassword((v) => !v)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showFormPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-1 text-sm"
              type={showFormToken ? "text" : "password"}
              placeholder="Security Token"
              value={form.securityToken}
              onChange={(e) =>
                setForm({ ...form, securityToken: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowFormToken((v) => !v)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showFormToken ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="rounded-md border border-neutral-400 dark:border-neutral-600 px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Save Credentials
          </button>

          {message && (
            <p
              className={`text-xs ${
                messageType === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
