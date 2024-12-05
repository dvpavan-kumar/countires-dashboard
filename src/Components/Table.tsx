import React, { useState } from "react";

interface TableProps {
  headers: string[];
  bodyContent: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ headers, bodyContent }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = bodyContent.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(bodyContent.length / rowsPerPage);

  return (
    <div className="overflow-x-auto shadow-lg sm:rounded-lg bg-white p-6">
      <table className="min-w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm font-semibold uppercase tracking-wider">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-xs font-medium text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentRows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gradient-to-r from-gray-100 to-gray-200 transition duration-300"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 text-sm font-medium text-gray-800"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-6 py-3 rounded-md text-white ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`px-6 py-3 rounded-md text-white ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
