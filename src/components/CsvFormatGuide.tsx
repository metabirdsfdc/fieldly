export default function CsvFormatGuide() {
  return (
    <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 text-sm space-y-4 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <h2 className="font-semibold text-neutral-800 dark:text-neutral-200">
        CSV Format Guide
      </h2>

      <p className="text-neutral-600 dark:text-neutral-400">
        The CSV file must follow the exact column structure below. Headers are{" "}
        <strong className="text-neutral-800 dark:text-neutral-200">
          required
        </strong>
        .
      </p>

      <table className="w-full border border-neutral-300 dark:border-neutral-700 text-xs">
        <thead className="bg-neutral-100 dark:bg-neutral-800">
          <tr>
            <th className="border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-left">
              Column
            </th>
            <th className="border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-left">
              Required
            </th>
            <th className="border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-left">
              Description
            </th>
            <th className="border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-left">
              Example
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              sobject
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Yes
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Salesforce object API name
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Account
            </td>
          </tr>

          <tr>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              fieldName
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Yes
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              API name of the field (no spaces)
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Customer_Code__c
            </td>
          </tr>

          <tr>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              label
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Yes
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Display label in Salesforce UI
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Customer Code
            </td>
          </tr>

          <tr>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              type
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Yes
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Salesforce field data type
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Text
            </td>
          </tr>

          <tr>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              length
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Optional
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Required for Text fields only
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              50
            </td>
          </tr>

          <tr>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              values
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Optional
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Picklist values (semicolon separated)
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              New;Active;Closed
            </td>
          </tr>

          <tr>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              required
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Yes
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              Whether the field is mandatory
            </td>
            <td className="border border-neutral-300 dark:border-neutral-700 px-2 py-1">
              true
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <p className="font-medium mb-1 text-neutral-800 dark:text-neutral-200">
          Sample CSV
        </p>
        <pre className="bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 text-xs overflow-x-auto text-neutral-800 dark:text-neutral-200">
          sobject,fieldName,label,type,length,values,required
          <br />
          Account,Customer_Code__c,Customer Code,Text,50,,true
          <br />
          Account,Status__c,Status,Picklist,,New;Active;Closed,false
        </pre>
      </div>

      <p className="text-neutral-500 dark:text-neutral-400 text-xs">
        ⚠ Column names must match exactly. Extra or missing columns will cause
        deployment failure.
      </p>
    </div>
  );
}
