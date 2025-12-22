import { useState } from "react";
import AuthSlide from "../components/ui/AuthSlide";
import { PrimaryButton } from "../components/ui/Buttons";

export default function LandingPage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F6FFF8] px-6 text-neutral-900">
      <div className="max-w-3xl text-center space-y-7">
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-medium text-yellow-800">
          Salesforce Deployment Tool
        </span>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
          Deploy Salesforce Fields
          <br />
          <span className="text-yellow-600">in Minutes</span>
        </h1>

        <p className="mx-auto max-w-xl text-base text-slate-600">
          Easily upload CSVs, manage org credentials, and deploy Salesforce
          metadata with confidence.
        </p>

        <div className="flex justify-center pt-2 w-full">
          {" "}
          <PrimaryButton className="sm:w-auto" onClick={() => setOpen(true)}>
            Get Started
          </PrimaryButton>{" "}
        </div>
      </div>

      <AuthSlide open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
