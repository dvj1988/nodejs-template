const assertValidity = require('./validate');


function getPaginationProps(pagination) {
  let { pageNumber, pageSize } = pagination;

  const isPageNumberValid = assertValidity([{ value: pageNumber, type: 'number' }]);
  pageNumber = isPageNumberValid ? parseInt(pageNumber, 10) : 1;

  const isPageSizeValid = assertValidity([{ value: pageNumber, type: 'number' }]);
  pageSize = isPageSizeValid ? parseInt(pageSize, 10) : 10;
  pageSize = pageSize <= 10 ? pageSize : 10;

  return {
    pageNumber: pageNumber - 1, pageSize
  };
}

module.exports = getPaginationProps;
