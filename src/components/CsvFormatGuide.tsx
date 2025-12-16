export default function CsvFormatGuide() {
  return (
    <div className="border border-gray-300 p-4 rounded-md text-sm space-y-3">
      <h2 className="font-semibold">CSV Format Guide</h2>

      <p className="text-gray-600">
        The CSV file must follow the exact column structure below. Headers are{" "}
        <strong>required</strong>.
      </p>

      <table className="w-full border border-gray-300 text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">Column</th>
            <th className="border px-2 py-1 text-left">Required</th>
            <th className="border px-2 py-1 text-left">Description</th>
            <th className="border px-2 py-1 text-left">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">sobject</td>
            <td className="border px-2 py-1">Yes</td>
            <td className="border px-2 py-1">Salesforce object API name</td>
            <td className="border px-2 py-1">Account</td>
          </tr>

          <tr>
            <td className="border px-2 py-1">fieldName</td>
            <td className="border px-2 py-1">Yes</td>
            <td className="border px-2 py-1">
              API name of the field (no spaces)
            </td>
            <td className="border px-2 py-1">Customer_Code__c</td>
          </tr>

          <tr>
            <td className="border px-2 py-1">label</td>
            <td className="border px-2 py-1">Yes</td>
            <td className="border px-2 py-1">Display label in Salesforce UI</td>
            <td className="border px-2 py-1">Customer Code</td>
          </tr>

          <tr>
            <td className="border px-2 py-1">type</td>
            <td className="border px-2 py-1">Yes</td>
            <td className="border px-2 py-1">Salesforce field data type</td>
            <td className="border px-2 py-1">Text</td>
          </tr>

          <tr>
            <td className="border px-2 py-1">length</td>
            <td className="border px-2 py-1">Optional</td>
            <td className="border px-2 py-1">Required for Text fields only</td>
            <td className="border px-2 py-1">50</td>
          </tr>

          <tr>
            <td className="border px-2 py-1">values</td>
            <td className="border px-2 py-1">Optional</td>
            <td className="border px-2 py-1">
              Picklist values (semicolon separated)
            </td>
            <td className="border px-2 py-1">New;Active;Closed</td>
          </tr>

          <tr>
            <td className="border px-2 py-1">required</td>
            <td className="border px-2 py-1">Yes</td>
            <td className="border px-2 py-1">Whether the field is mandatory</td>
            <td className="border px-2 py-1">true</td>
          </tr>
        </tbody>
      </table>

      <div>
        <p className="font-medium mb-1">Sample CSV</p>
        <pre className="bg-gray-100 p-2 text-xs overflow-x-auto">
          sobject,fieldName,label,type,length,values,required
          <br />
          Account,Customer_Code__c,Customer Code,Text,50,,true
          <br />
          Account,Status__c,Status,Picklist,,New;Active;Closed,false
        </pre>
      </div>

      <p className="text-gray-500 text-xs">
        ⚠ Column names must match exactly. Extra or missing columns will cause
        deployment failure.
      </p>
    </div>
  );
}
