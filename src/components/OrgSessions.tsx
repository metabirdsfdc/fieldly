import axios from "axios";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/ui/Buttons";
import { CredentialsModal } from "./CredentialsModal";

type Session = { username: string };

const API = axios.create({ baseURL: "http://localhost:3000" });

export default function OrgSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [open, setOpen] = useState(false);

  const load = () => {
    API.get("/request/v1/credentials")
      .then((res) => setSessions(res.data?.username ? [res.data] : []))
      .catch(() => setSessions([]));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <section className="w-full md:max-w-3xl space-y-6 rounded-2xl bg-[#F6FFF8] p-4 md:p-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Connected Orgs
            </h2>
            <p className="text-sm text-slate-600">
              Manage active Salesforce sessions
            </p>
          </div>

          <PrimaryButton
            className="sm:w-auto w-full"
            onClick={() => setOpen(true)}
          >
            Add Session
          </PrimaryButton>
        </header>

        {sessions.length === 0 ? (
          <div className="rounded-xl bg-[#E9F8E7] p-8 text-center">
            <p className="text-sm font-medium text-slate-600">
              No org sessions connected
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Add a Salesforce org to start deploying metadata
            </p>
          </div>
        ) : (
          <div className="divide-y rounded-xl bg-[#F6FFF8]">
            {sessions.map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-6 py-4"
              >
                <span className="text-sm font-medium text-slate-900 break-all">
                  {s.username}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Active
                </span>
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
