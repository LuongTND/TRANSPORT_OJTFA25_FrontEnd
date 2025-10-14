import React from 'react';
export default function Table({columns, data, className=''}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full text-sm border border-green-100">
        <thead>
          <tr className="bg-green-100 text-green-800">
            {columns.map((c,i)=>(<th key={i} className="py-2 px-3 border-b border-green-100">{c.label}</th>))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id||idx} className="border-b last:border-0 hover:bg-green-50">
              {columns.map((col, j) => (
                <td key={j} className="py-2 px-3">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
