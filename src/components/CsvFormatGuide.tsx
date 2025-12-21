export default function CsvFormatGuide() {
  return (
    <section className="border border-slate-300 rounded-xl bg-white p-6 space-y-6">
      <h2 className="text-sm font-medium text-slate-900">CSV Format Guide</h2>

      <p className="text-sm text-slate-600">
        The CSV must match the required column structure exactly.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border border-slate-300">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              {["Column", "Required", "Description", "Example"].map((h) => (
                <th
                  key={h}
                  className="border border-slate-300 px-3 py-2 text-left font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {[
              ["sobject", "Yes", "Salesforce object API name", "Account"],
              ["fieldName", "Yes", "Field API name", "Customer_Code__c"],
              ["label", "Yes", "UI label", "Customer Code"],
              ["type", "Yes", "Field data type", "Text"],
              ["length", "Optional", "Text length", "50"],
              ["values", "Optional", "Picklist values", "New;Active;Closed"],
              ["required", "Yes", "Is mandatory", "true"]
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className="border border-slate-300 px-3 py-2 text-slate-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-900 mb-2">Sample CSV</p>
        <pre className="text-xs bg-white border border-slate-300 rounded-xl p-3 text-slate-800 overflow-x-auto">
          sobject,fieldName,label,type,length,values,required
          <br />
          Account,Customer_Code__c,Customer Code,Text,50,,true
          <br />
          Account,Status__c,Status,Picklist,,New;Active;Closed,false
        </pre>
      </div>

      <p className="text-xs text-slate-500">
        Column names must match exactly. Extra or missing columns will fail
        deployment.
      </p>
    </section>
  );
}
