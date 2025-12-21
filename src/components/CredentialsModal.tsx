import axios from "axios";
import { useRef, useState } from "react";

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
  headers: { "Content-Type": "application/json" }
});

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export function CredentialsModal({ open, onClose, onSaved }: Props) {
  const [form, setForm] = useState<Credentials>(EMPTY_FORM);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const clearLater = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  if (!open) return null;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.post("/request/v1/credentials", form);
      setForm(EMPTY_FORM);
      setMessage("Session added successfully");
      setMessageType("success");
      clearLater();
      onSaved();
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to save credentials");
      setMessageType("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-5 md:px-0">
      <div className="w-full max-w-lg rounded-xl bg-white border border-slate-300 p-6">
        <header className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-slate-900">
            Add Salesforce Session
          </h2>
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-900"
          >
            Close
          </button>
        </header>

        <form onSubmit={submit} className="space-y-4">
          <div className="border border-slate-300 rounded-xl px-3 py-2 focus-within:border-blue-600 transition">
            <input
              className="w-full text-sm outline-none bg-transparent"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-3 py-2 focus-within:border-blue-600 transition">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 text-sm outline-none bg-transparent"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-xs text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-3 py-2 focus-within:border-blue-600 transition">
            <input
              type={showToken ? "text" : "password"}
              placeholder="Security Token"
              className="flex-1 text-sm outline-none bg-transparent"
              value={form.securityToken}
              onChange={(e) =>
                setForm({ ...form, securityToken: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowToken((v) => !v)}
              className="text-xs text-blue-600"
            >
              {showToken ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 text-white py-2.5 text-sm font-medium hover:bg-blue-700 transition"
          >
            Save Session
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
        </form>
      </div>
    </div>
  );
}
