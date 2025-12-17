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
          setSaved(null); // no credentials yet
        }
      })
      .catch((err) => {
        console.error("Failed to fetch credentials:", err);
        setSaved(null);
      });
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
    <div className="space-y-4">
      {saved && (
        <div className="border border-gray-300 p-4 rounded-md">
          <h2 className="text-sm font-semibold mb-3">Saved Credentials</h2>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Username:</span> {saved.username}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Password:</span>
              <span>{showPassword ? saved.password : "••••••••"}</span>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-xs text-blue-600 underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Security Token:</span>
              <span>{showToken ? saved.securityToken : "••••••••"}</span>
              <button
                type="button"
                onClick={() => setShowToken((v) => !v)}
                className="text-xs text-blue-600 underline"
              >
                {showToken ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="button"
              onClick={clear}
              className="mt-2 border border-red-400 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
            >
              Clear Credentials
            </button>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="border border-gray-300 p-4 rounded-md">
        <h2 className="text-sm font-semibold mb-3">
          Save / Update Credentials
        </h2>

        <div className="space-y-2">
          <input
            className="w-full border border-gray-300 px-2 py-1 text-sm"
            placeholder="Username"
            autoComplete="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <div className="flex items-center gap-2">
            <input
              className="w-full border border-gray-300 px-2 py-1 text-sm"
              type={showFormPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="no"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="button"
              onClick={() => setShowFormPassword((v) => !v)}
              className="text-xs text-blue-600 underline"
            >
              {showFormPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              className="w-full border border-gray-300 px-2 py-1 text-sm"
              type={showFormToken ? "text" : "password"}
              placeholder="Security Token"
              autoComplete="not"
              value={form.securityToken}
              onChange={(e) =>
                setForm({ ...form, securityToken: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowFormToken((v) => !v)}
              className="text-xs text-blue-600 underline"
            >
              {showFormToken ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="border border-gray-400 px-3 py-1 text-sm"
          >
            Save Credentials
          </button>

          {message && (
            <p
              className={`text-xs ${
                messageType === "success" ? "text-green-600" : "text-red-600"
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
