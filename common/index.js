// import notebookTypes from "./notebook-types"

const notebookUtils = require('./notebook-utils');

module.exports = {
  notebookTypes: notebookUtils.notebookTypes,
  notebookFields: notebookUtils.notebookFields,
  compareNotebooks: notebookUtils.compareNotebooks,
  isValidNotebook: notebookUtils.isValidNotebook
}
