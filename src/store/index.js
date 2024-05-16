import Vue from 'vue';
import Vuex from 'vuex';
import rawData from '@/assets/raw.json';
Vue.use(Vuex);
const data = rawData;

export default new Vuex.Store({
  state: {
    data,
    filters: {
      product_type: null,
      grade: null,
      size: null,
      connection: null,
    },
    pagination: {
      page: 1,
      perPage: 10,
    },
  },
  mutations: {
    setFilter(state, { key, value }) {
      state.filters[key] = value;
    },
    resetFilters(state) {
      state.filters.product_type = null;
      state.filters.grade = null;
      state.filters.size = null;
      state.filters.connection = null;
    },
    setPage(state, page) {
      state.pagination.page = page;
    },
    setPerPage(state, perPage) {
      state.pagination.perPage = perPage;
    },
  },
  getters: {
    filteredData(state) {
      const filtered = state.data.filter((item) => {
        return Object.keys(state.filters).every((key) => {
          return !state.filters[key] || item[key] === state.filters[key];
        });
      });
      const start = (state.pagination.page - 1) * state.pagination.perPage;
      const end = start + state.pagination.perPage;
      return filtered.slice(start, end);
    },
    totalQuantity(state, getters) {
      return getters.filteredData.length;
    },
    totalFilteredItems(state) {
      return state.data.filter((item) => {
        return Object.keys(state.filters).every((key) => {
          return !state.filters[key] || item[key] === state.filters[key];
        });
      }).length;
    },
    allOptionsWithCount: (state) => (key) => {
      const options = {};
      state.data.forEach((item) => {
        if (!options[item[key]]) {
          options[item[key]] = 0;
        }
        options[item[key]]++;
      });
      return Object.keys(options).map((option) => ({
        value: option,
        label: `${option}`,
        count: options[option],
      }));
    },
  },
});