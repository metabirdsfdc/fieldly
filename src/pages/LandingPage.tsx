// import { ArrowRight, FileText, ShieldCheck, Upload } from "lucide-react";

import { OutlineButton, PrimaryButton } from "../components/ui/Buttons";

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-white text-neutral-900">
//       <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
//         <div className="text-lg font-semibold tracking-tight">Metafield</div>
//         <a
//           href="/deploy"
//           className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
//         >
//           Get Started
//         </a>
//       </header>

//       <main className="max-w-7xl mx-auto px-6">
//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
//           <div>
//             <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
//               Deploy Salesforce metadata
//               <span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
//                 using a simple CSV
//               </span>
//             </h1>

//             <p className="mt-6 text-lg text-neutral-600 max-w-xl">
//               Upload a CSV file and deploy custom fields instantly. No manual
//               setup. No mistakes. Fully automated.
//             </p>

//             <div className="mt-8 flex gap-4">
//               <a
//                 href="/deploy"
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full
//                 bg-gradient-to-r from-blue-600 to-indigo-600
//                 text-white font-medium shadow-lg hover:shadow-xl transition"
//               >
//                 Start Deployment
//                 <ArrowRight size={18} />
//               </a>

//               <a
//                 href="#features"
//                 className="px-6 py-3 rounded-full border border-neutral-300
//                 text-neutral-700 hover:bg-neutral-50 transition"
//               >
//                 Learn More
//               </a>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 blur-3xl opacity-60 rounded-full" />
//             <div className="relative bg-white rounded-3xl shadow-xl p-8">
//               <div className="space-y-4 text-sm font-mono text-neutral-700">
//                 <div>sobject,fieldName,label,type,length,values,required</div>
//                 <div>Account,Customer_Code__c,Customer Code,Text,50,,true</div>
//                 <div>Account,Status__c,Status,Picklist,,New;Active,false</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section
//           id="features"
//           className="py-24 grid grid-cols-1 md:grid-cols-3 gap-8"
//         >
//           <FeatureCard
//             icon={<FileText />}
//             title="CSV Driven"
//             text="Define all Salesforce fields using a single, structured CSV file."
//             gradient="from-blue-500 to-cyan-400"
//           />

//           <FeatureCard
//             icon={<Upload />}
//             title="One-Click Deploy"
//             text="Upload and deploy instantly without navigating Salesforce UI."
//             gradient="from-indigo-500 to-purple-500"
//           />

//           <FeatureCard
//             icon={<ShieldCheck />}
//             title="Safe & Reliable"
//             text="Validations ensure no broken deployments or incorrect metadata."
//             gradient="from-green-500 to-emerald-400"
//           />
//         </section>

//         <section className="py-24 text-center">
//           <h2 className="text-3xl font-semibold tracking-tight">
//             Ready to deploy faster?
//           </h2>

//           <p className="mt-4 text-neutral-600">
//             Move from CSV to Salesforce in seconds.
//           </p>

//           <a
//             href="/deploy"
//             className="inline-flex items-center gap-2 mt-8 px-8 py-4
//             rounded-full bg-gradient-to-r from-blue-600 to-indigo-600
//             text-white font-medium shadow-lg hover:shadow-xl transition"
//           >
//             Go to Deployment
//             <ArrowRight size={18} />
//           </a>
//         </section>
//       </main>

//       <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
//         <span className="font-medium text-neutral-700">
//           Suddala Pavan Kalyan
//         </span>{" "}
//         ·{" "}
//         <a
//           href="https://www.linkedin.com/in/suddalapavankalyan/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 hover:underline"
//         >
//           LinkedIn
//         </a>
//       </footer>
//     </div>
//   );
// };

// function FeatureCard({
//   icon,
//   title,
//   text,
//   gradient
// }: {
//   icon: React.ReactNode;
//   title: string;
//   text: string;
//   gradient: string;
// }) {
//   return (
//     <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
//       <div
//         className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient}
//         flex items-center justify-center text-white`}
//       >
//         {icon}
//       </div>

//       <h3 className="mt-4 font-semibold text-lg">{title}</h3>

//       <p className="mt-2 text-sm text-neutral-600">{text}</p>
//     </div>
//   );
// }

// export default LandingPage;

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
          Salesforce Deployment Tool
        </span>

        <h1 className="text-4xl font-semibold text-slate-900">
          Deploy Salesforce Fields
          <br />
          <span className="text-blue-600">in Minutes</span>
        </h1>

        <p className="text-slate-600 text-base max-w-xl mx-auto">
          Upload CSVs, manage credentials, and deploy metadata securely — fast,
          clean, and reliable.
        </p>

        <div className="flex justify-center gap-4">
          <PrimaryButton>Get Started</PrimaryButton>
          <OutlineButton>View CSV Format</OutlineButton>
        </div>
      </div>
    </main>
  );
}
