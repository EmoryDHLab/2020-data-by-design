import { MODULE_NAME as DATA_MODULE_NAME} from '@/store/data/index'
// note that most of these return functions to allow for more specific gets
const getters = {
  getVis: state => {
    return id => state.visualizations[id]
  },
  getDatasetId: (state, getters) => {
    return id => getters.getVis(id).datasetId
  },
  getDataset: (state, getters, rootState, rootGetters) => {
    return id => {
      // get the actual dataset given by id from the data module
      return rootGetters[DATA_MODULE_NAME + '/getDataset'](getters.getVis(id).datasetId)
    }
  },
  getFormattedData: (state, getters) => {
    return id => state.visualizations[id].dataFormatter(getters.getDataset(id))
  },
  getConfig: (state, getters) => {
    return id => getters.getVis(id).config
  },
  count: (state) => {
    return Object.keys(state.visualizations).length
  }
}

export default getters
