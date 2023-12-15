enum PAGINATION {
  DEFAULT_SIZE = 20,
  DEFAULT_PAGE = 1,
  DEFAULT_ORDER = 'DESC',
  DEFAULT_SORTBY = 'created_at',
}

const schemaConstant = Object.freeze({
  pagination: PAGINATION,
})

export default schemaConstant
