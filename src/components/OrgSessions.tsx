import { useEffect, useState } from "react";
import { backendApi } from "../api/api";
import { PrimaryButton } from "../components/ui/Buttons";
import { CredentialsModal } from "./CredentialsModal";

type Session = {
  _id: string;
  username: string;
  orgName?: string;
  active: boolean;
};

export default function OrgSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [open, setOpen] = useState(false);

  const load = () => {
    backendApi
      .get("/request/v1/credentials")
      .then((res) => {
        setSessions(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setSessions([]));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await backendApi.delete(`/request/v1/credentials/${id}`);

      setSessions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete credential", err);
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await backendApi.patch(`/request/v1/credentials/${id}/activate`);

      setSessions((prev) =>
        prev.map((s) => ({
          ...s,
          active: s._id === id
        }))
      );
    } catch (err) {
      console.error("Failed to activate session", err);
    }
  };

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

        {sessions.map((s) => (
          <div
            key={s._id}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b last:border-b-0"
          >
            <div className="flex flex-col">
              {s.orgName && (
                <span className="text-xs font-medium text-black">
                  {s.orgName}
                </span>
              )}
              <span className="text-xs text-slate-500 break-all">
                {s.username}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {s.active && (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Active
                </span>
              )}

              {!s.active && (
                <button
                  onClick={() => handleActivate(s._id)}
                  className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Use this
                </button>
              )}

              {/* <button
                onClick={() => handleEdit(s)}
                className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                Update
              </button> */}

              <button
                onClick={() => handleDelete(s._id)}
                className="text-xs font-medium text-red-600 hover:text-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

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
