import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import { TableRowSkeleton } from './Loading';

const Table = ({
  columns,
  data,
  isLoading = false,
  pagination = true,
  initialPageSize = 10,
  sortable = true,
  searchable = true,
  selectable = false,
  onRowClick,
  emptyMessage = 'No data available',
  rowActions,
  bulkActions
}) => {
  // State
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(item =>
      columns.some(column => {
        const value = item[column.key];
        if (!value) return false;
        return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, columns, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handle sort
  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc'
        ? 'desc'
        : 'asc'
    }));
  };

  // Handle page change
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
      setCurrentPage(1);
    }
  };

  // Handle row selection
  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // Handle select all rows
  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === paginatedData.length
        ? []
        : paginatedData.map(row => row.id)
    );
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      {(searchable || bulkActions) && (
        <div className="flex justify-between items-center">
          {/* Search */}
          {searchable && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {bulkActions && selectedRows.length > 0 && (
            <div className="flex items-center space-x-2">
              {bulkActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => action.onClick(selectedRows)}
                  className={`btn-${action.variant || 'secondary'}`}
                >
                  {action.icon && <i className={`${action.icon} mr-2`}></i>}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              {/* Selection Checkbox */}
              {selectable && (
                <th className="px-6 py-3 w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                  />
                </th>
              )}

              {/* Column Headers */}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${sortable && !column.unsortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    ${column.width ? `w-${column.width}` : ''}
                  `}
                  onClick={() => !column.unsortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortable && !column.unsortable && (
                      <span className="text-gray-400">
                        {sortConfig.key === column.key ? (
                          <i className={`fas fa-sort-${sortConfig.direction}`}></i>
                        ) : (
                          <i className="fas fa-sort"></i>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}

              {/* Actions Column */}
              {rowActions && <th className="px-6 py-3 w-24"></th>}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Loading State
              [...Array(pageSize)].map((_, index) => (
                <TableRowSkeleton
                  key={index}
                  columns={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                />
              ))
            ) : paginatedData.length > 0 ? (
              // Data Rows
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className={`
                    ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                    ${selectedRows.includes(row.id) ? 'bg-indigo-50' : ''}
                  `}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {/* Selection Checkbox */}
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectRow(row.id);
                        }}
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      />
                    </td>
                  )}

                  {/* Data Cells */}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 whitespace-nowrap ${
                        column.className || ''
                      }`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}

                  {/* Row Actions */}
                  {rowActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {rowActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            className={`text-${action.color || 'indigo'}-600 hover:text-${
                              action.color || 'indigo'
                            }-900`}
                            title={action.label}
                          >
                            <i className={action.icon}></i>
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              // Empty State
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (rowActions ? 1 : 0)
                  }
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && !isLoading && data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedData.length / pageSize)}
          pageSize={pageSize}
          totalItems={sortedData.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

// Example usage:
/*
import Table from './components/Table';

const MyComponent = () => {
  const columns = [
    {
      key: 'name',
      label: 'Name',
      // Optional: Custom render function
      render: (value, row) => (
        <div className="flex items-center">
          <img src={row.avatar} className="h-8 w-8 rounded-full mr-2" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`badge badge-${value.toLowerCase()}`}>
          {value}
        </span>
      )
    }
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
  ];

  const rowActions = [
    {
      icon: 'fas fa-edit',
      label: 'Edit',
      onClick: (row) => console.log('Edit', row)
    },
    {
      icon: 'fas fa-trash',
      label: 'Delete',
      color: 'red',
      onClick: (row) => console.log('Delete', row)
    }
  ];

  const bulkActions = [
    {
      label: 'Delete Selected',
      icon: 'fas fa-trash',
      variant: 'danger',
      onClick: (selectedIds) => console.log('Delete', selectedIds)
    }
  ];

  return (
    <Table
      columns={columns}
      data={data}
      rowActions={rowActions}
      bulkActions={bulkActions}
      selectable
      onRowClick={(row) => console.log('Row clicked', row)}
    />
  );
};
*/

export default Table;