import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CustomTable = ({ columns, data, onEdit, onDelete, renderActions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete || renderActions) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={row._id || index} className="hover:bg-gray-50">
              {/* {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate"
                  title={row[col.key]}
                >
                  {col.key === 'serialNumber' ? index + 1 : row[col.key]}
                </td>
              ))} */}

              {columns.map((col) => (
            <td
              key={col.key}
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate"
              title={col.render ? col.render(row) : row[col.key]}
            >
              {col.key === 'serialNumber'
                ? index + 1
                : col.render
                ? col.render(row)
                : row[col.key]}
            </td>
))}

              {(onEdit || onDelete || renderActions) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {renderActions ? (
                    renderActions(row)
                  ) : (
                    <>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-black bg-transparent hover:text-indigo-600 mr-3"
                        >
                          <FaEdit />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-black bg-transparent hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
