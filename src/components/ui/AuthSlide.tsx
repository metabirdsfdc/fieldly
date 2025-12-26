import axios from "axios";
import clsx from "clsx";
import { Lock, Mail, User, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

type AuthSlideProps = {
  open: boolean;
  onClose: () => void;
};

type Mode = "login" | "signup";

type AuthForm = {
  fullName: string;
  email: string;
  password: string;
};

const initialForm: AuthForm = {
  fullName: "",
  email: "",
  password: ""
};

export default function AuthSlide({ open, onClose }: AuthSlideProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState<AuthForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setForm(initialForm);
    setError(null);
  }, [mode, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/auth`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = mode === "login" ? "/login" : "/signup";
      const finalUrl = `${BASE_URL}${url}`;
      console.log(finalUrl);
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : {
              fullName: form.fullName,
              email: form.email,
              password: form.password
            };

      const { data } = await axios.post(`${BASE_URL}${url}`, payload);

      console.log("Data", data.data);
      login(data.data);
      onClose();
      window.location.href = "/app";
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Authentication failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 bg-black/20 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      <div
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-[420px]",
          "bg-[#F6FFF8]",
          "border-l border-slate-200",
          "transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-900"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-sm text-slate-600">
            {mode === "login"
              ? "Access your Metafield workspace"
              : "Start managing Salesforce metadata"}
          </p>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label className="text-xs font-medium text-slate-700">
                  Name
                </label>
                <div className="relative mt-1">
                  <User
                    className="absolute left-3 top-2.5 text-slate-400"
                    size={16}
                  />
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-slate-700">
                Email
              </label>
              <div className="relative mt-1">
                <Mail
                  className="absolute left-3 top-2.5 text-slate-400"
                  size={16}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700">
                Password
              </label>
              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-2.5 text-slate-400"
                  size={16}
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-md bg-yellow-500 py-2 text-sm font-medium text-slate-900 hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className="mt-auto text-center text-sm text-slate-600">
            {mode === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() =>
                setMode((m) => (m === "login" ? "signup" : "login"))
              }
              className="font-medium text-yellow-600 hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
