import axios from "axios";
import { useEffect, useState } from "react";
import { CredentialsModal } from "./CredentialsModal";

type Session = {
  username: string;
};

const API = axios.create({
  baseURL: "https://fieldler.onrender.com"
});

export default function OrgSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [open, setOpen] = useState(false);

  const load = () => {
    API.get("/request/v1/credentials")
      .then((res) => setSessions(res.data?.username ? [res.data] : []))
      .catch(() => setSessions([]));
  };

  useEffect(load, []);

  return (
    <div className="w-full flex justify-center">
      <section className="w-full max-w-3xl space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-medium text-slate-900">
              Connected Orgs
            </h2>
            <p className="text-xs text-slate-500">
              Manage active Salesforce sessions
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700 sm:w-auto w-full"
          >
            Add Session
          </button>
        </header>

        {sessions.length === 0 ? (
          <div className="border border-slate-300 rounded-xl p-6 text-sm text-slate-500 text-center">
            No org sessions connected yet.
          </div>
        ) : (
          <div className="border border-slate-300 rounded-xl divide-y">
            {sessions.map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between px-5 py-4 text-sm"
              >
                <span className="text-slate-900 break-all">{s.username}</span>
                <span className="text-xs text-green-600">Active</span>
              </div>
            ))}
          </div>
        )}

        <CredentialsModal
          open={open}
          onClose={() => setOpen(false)}
          onSaved={() => {
            setOpen(false);
            load();
          }}
        />
      </section>
    </div>
  );
}
