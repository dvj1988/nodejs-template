function getPageInfo(pageNumber, pageSize, totalCount) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = pageNumber < totalPages;
  const hasPrevPage = pageNumber > 1;

  return {
    totalCount,
    totalPages,
    pageNumber,
    hasNextPage,
    hasPrevPage
  };
}

module.exports = getPageInfo;
