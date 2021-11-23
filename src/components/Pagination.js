import React from 'react'

const Pagination = ({ tableInstance, paginationConfig }) => {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance

  const { hasJumpToPage, hasRowsPerPage, wrapperStyle } = paginationConfig

  const jumpToPage = (
    <span>
      Jump To:{' '}
      <input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          gotoPage(page)
        }}
        style={{ width: '100px' }}
      />{' '}
    </span>
  )

  const rowsPerPage = (
    <select
      value={pageSize}
      onChange={e => {
        setPageSize(Number(e.target.value))
      }}
    >
      {[10, 20, 30, 40, 50, 75, 100].map(currentPageSize => {
        // default the value to the page size that the user specified in paginationConfig
        const defaultValue =
          currentPageSize === pageSize ? pageSize : currentPageSize

        return (
          <option
            key={currentPageSize}
            value={currentPageSize}
            defaultValue={defaultValue}
          >
            Rows per Page: {currentPageSize}
          </option>
        )
      })}
    </select>
  )

  return (
    <div
      style={{
        textAlign: 'right',
        margin: '6px 0',
        ...wrapperStyle,
      }}
    >
      {/* Default Page Nav */}
      <span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
      </span>

      {/* Show jump-to-page and/or rows-per-page UI depending on config */}
      {hasJumpToPage ? jumpToPage : null}
      {hasRowsPerPage ? rowsPerPage : null}
    </div>
  )
}

export default Pagination
