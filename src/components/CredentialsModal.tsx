import axios from "axios";
import { useRef, useState } from "react";
import { PrimaryButton } from "../components/ui/Buttons";

type Credentials = {
  orgName: string;
  username: string;
  password: string;
  securityToken: string;
};

const EMPTY_FORM: Credentials = {
  orgName: "",
  username: "",
  password: "",
  securityToken: ""
};

type MessageType = "success" | "error" | "";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json"
  }
});

type Props = { open: boolean; onClose: () => void; onSaved: () => void };

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
    console.log("Cliecked");
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

  const inputClass = "flex-1 text-sm outline-none bg-transparent w-full";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-5 md:px-0">
      <div className="w-full max-w-lg rounded-2xl bg-[#F6FFF8] border border-slate-200 p-8">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900">
            Add Salesforce Session
          </h2>
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:text-slate-900 transition"
          >
            Close
          </button>
        </header>

        <form onSubmit={submit} className="space-y-4">
          <div className="border border-slate-200 rounded-xl px-4 py-3 focus-within:border-yellow-400 transition">
            <input
              className={inputClass}
              placeholder="Org Name"
              value={form.orgName}
              onChange={(e) => setForm({ ...form, orgName: e.target.value })}
            />
          </div>
          <div className="border border-slate-200 rounded-xl px-4 py-3 focus-within:border-yellow-400 transition">
            <input
              className={inputClass}
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-yellow-400 transition">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={inputClass}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-xs text-yellow-600 font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-yellow-400 transition">
            <input
              type={showToken ? "text" : "password"}
              placeholder="Security Token"
              className={inputClass}
              value={form.securityToken}
              onChange={(e) =>
                setForm({ ...form, securityToken: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowToken((v) => !v)}
              className="text-xs text-yellow-600 font-medium"
            >
              {showToken ? "Hide" : "Show"}
            </button>
          </div>

          <PrimaryButton type="submit" className="w-full sm:w-auto">
            Save Session
          </PrimaryButton>

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
