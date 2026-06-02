import React, { useState, useMemo } from 'react'
import Card from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'

import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

function ReactTable ({ name, columns, data, isPaginated, isGlobalFiltered, isSortered, hasNewButton = false, newEntityUrl }) {
  // const IndeterminateCheckbox = React.forwardRef(
  //   ({ indeterminate, ...rest }, ref) => {
  //     const defaultRef = React.useRef()
  //     const resolvedRef = ref || defaultRef

  //     React.useEffect(() => {
  //       resolvedRef.current.indeterminate = indeterminate
  //     }, [resolvedRef, indeterminate])

  //     return (
  //       <>
  //         <input
  //           type='checkbox'
  //           ref={resolvedRef}
  //           {...rest}
  //           className='table-checkbox'
  //         />
  //       </>
  //     )
  //   }
  // )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()

  })

  const navigate = useNavigate()

  return (
    <>
      <div className='w-[100%] overflow-auto'>
        <Card noborder className='w-full bg-white '>
          <div className='md:flex justify-between items-center mb-6'>
            <h4 className='card-title'>{name}</h4>
            {hasNewButton && newEntityUrl &&

              <div className='flex items-center space-x-3 justify-center h-[40px]'>
                <Button className='btn btn-primary flex items-center justify-center h-10 md:w-60 w-full mt-4 md:mt-0' onClick={() => navigate(newEntityUrl)}><Icon icon='heroicons-outline:plus' className='mr-2' />Nuevo</Button>
              </div>}

          </div>
          <div className='overflow-x-auto -mx-6'>
            <div className='inline-block min-w-full align-middle'>
              <div className='overflow-hidden '>
                {data.length === 0
                  ? <p className='text-center text-slate-500 font-bold text-md uppercase py-10'>No hay datos</p>
                  : <table
                      className='bg-slate-100 dark:bg-slate-800 min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700'
                    >
                    <thead className=' border-t border-slate-100 dark:border-slate-800'>
                      {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className='bg-slate-50 dark:bg-slate-700 h-12'>
                          {headerGroup.headers.map(header => {
                            return (
                              <th key={header.id} className='table-th'>
                                {header.isPlaceholder
                                  ? null
                                  : (
                                    <div
                                      {...{
                                        className: header.column.getCanSort()
                                          ? 'cursor-pointer select-none flex items-center space-x-2'
                                          : '',
                                        onClick: header.column.getToggleSortingHandler()
                                      }}
                                    >
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                      {{
                                        asc: <Icon icon='heroicons-outline:arrow-up' />,
                                        desc: <Icon icon='heroicons-outline:arrow-down' />
                                      }[header.column.getIsSorted()] ?? null}
                                    </div>
                                    )}
                              </th>
                            )
                          })}
                        </tr>
                      ))}
                    </thead>

                    <tbody
                      className='bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700'
                    >
                      {table
                        .getRowModel()
                        .rows
                        .map(row => {
                          return (
                            <tr key={row.id}>
                              {row.getVisibleCells().map(cell => {
                                return (
                                  <td key={cell.id} className='table-td z-[9999]'>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </td>
                                )
                              })}
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>}

              </div>
            </div>
          </div>
          <div className='md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center'>
            <div className='flex items-center gap-2'>
              <Button
                className='border rounded-full p-1'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <Icon icon='heroicons-outline:chevron-double-left' className='w-5 h-5 rounded-full ' />
              </Button>
              <Button
                className='border rounded-full p-1'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <Icon icon='heroicons-outline:chevron-left' className='w-5 h-5 rounded-full ' />
              </Button>
              <Button
                className='border rounded-full p-1'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <Icon icon='heroicons-outline:chevron-right' className='w-5 h-5 rounded-full ' />
              </Button>
              <Button
                className='border rounded-full p-1'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <Icon icon='heroicons-outline:chevron-double-right' className='w-5 h-5 rounded-full ' />
              </Button>
              <span className='flex items-center gap-1'>
                <div>Page</div>
                <strong className='text-xs'>
                  {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </strong>
              </span>
              {/* <span className='flex items-center gap-1'>
                | Go to page:
                <input
                  type='number'
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(page)
                  }}
                  className='border p-1 rounded w-16'
                />
              </span> */}
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value))
                }}
                className='border rounded p-1 flex '
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default ReactTable
