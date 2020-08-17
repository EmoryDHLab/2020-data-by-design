const notebookTypes = {
  TEXT_HIGHLIGHT: 0,
  TYPED_NOTE: 1,
  IMAGE: 2,
  VISUALIZATION: 3
}

const notebookFields = {
 notebookId: "notebookId",
 type: "type",
 html: "html",
 data: "data",
 metadata: "metadata",
 attachedId: "attachedId"
}

const isValidNotebook = notebook => {
  if (!Array.isArray(notebook)) {
    return {valid: false, message: "Notebook must be an array"};
  }

  notebook.forEach ( (item, index) => {
    const invalid = message => { return { valid: false, message: `Notebook item of index ${index} ${message}` } }
    if (!Object.values(notebookTypes).includes(item.type)) {
      return invalid('must have a valid type property')
    }
    if (item.type == notebookTypes.VISUALIZATION) {
      if (typeof item.data !== 'object') {
        return invalid ('is a visualization and must have data object property')
      }
    } else {
      if (typeof item.html !== 'string') {
        return invalid('must have a string html property');
      }
    }
    if (!Number.isInteger(item.notebookId)) {
      return invalid('must have an integer notebookId property');
    }
    if (typeof item.metadata !== 'object') {
      return invalid('must have a object metadata property');
    }
  })
  return {valid: true}
}

const compareNotebooks = (nb1, nb2) => {
  if (!!nb1 != !!nb2) {
    return false;
  }
  if (!nb1 && !nb2) {
    return true;
  }
  if (nb1.length !== nb2.length) {
    return false;
  }
  for (let i = 0; i < nb1.length; i++) {
    const item1 = nb1[i];
    const item2 = nb2[i];

    for (field of Object.keys(notebookFields)) {
      if (field == notebookFields.data) {
        const data1 = item1[field];
        const data2 = item2[field];
        if (!data1 && ! data2) return true;
        const same = Object.keys(data1).every(key => data1[key] === data2[key]) &&
          Object.keys(data2).every(key => data1[key] === data2[key])
        if (!same) return false;
      }
      if (item1[field] !== item2[field]) {
        return false;
      }
    }
  }
  return true;
}

module.exports = { notebookTypes: notebookTypes, notebookFields, compareNotebooks, isValidNotebook }
