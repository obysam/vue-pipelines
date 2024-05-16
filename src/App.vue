<template>
  <v-app data-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedProductType"
            :items="productTypeOptions"
            item-text="label"
            item-value="value"
            label="Product Type"
            clearable
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedGrade"
            :items="gradeOptions"
            item-text="label"
            item-value="value"
            label="Grade"
            clearable
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedSize"
            :items="sizeOptions"
            item-text="label"
            item-value="value"
            label="Size"
            clearable
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedConnection"
            :items="connectionOptions"
            item-text="label"
            item-value="value"
            label="Connection"
            clearable
          ></v-select>
        </v-col>
      </v-row>
      <!-- Reset Button -->
      <v-row>
        <v-col>
          <v-btn @click="resetAllFilters">Reset Filters</v-btn>
        </v-col>
      </v-row>
      <!-- Card to display Total Quantity and filtered items -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Total Quantity: {{ countTotal  }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="item in filteredData" :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.product_type }} - Grade {{ item.grade }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Size {{ item.size }} - Connection {{ item.connection }} - Quantity {{ item.quantity }} units
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-pagination
                v-model="pagination.page"
                :length="pageCount"
                @input="changePage"
                :total-visible="7"
              ></v-pagination>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      selectedProductType: null,
      selectedGrade: null,
      selectedSize: null,
      selectedConnection: null,
    };
  },
  methods: {
    ...mapMutations(['setFilter', 'resetFilters', 'setPage']),
    resetAllFilters() {
      this.resetFilters();
      this.selectedProductType = null;
      this.selectedGrade = null;
      this.selectedSize = null;
      this.selectedConnection = null;
      this.setPage(1);
    },
    changePage(page) {
      this.setPage(page);
    },
  },
  computed: {
    ...mapState(['filters', 'pagination']),
    ...mapGetters(['filteredData', 'totalQuantity', 'allOptionsWithCount', 'totalFilteredItems']),
    productTypeOptions() {
      return this.allOptionsWithCount('product_type').map(option => ({
        label: `${option.label} (${option.count})`,
        value: option.value
      }));
    },
    gradeOptions() {
      return this.allOptionsWithCount('grade').map(option => ({
        label: `${option.label}`,
        value: option.value
      }));
    },
    sizeOptions() {
      return this.allOptionsWithCount('size').map(option => ({
        label: `${option.label}`,
        value: option.value
      }));
    },
    connectionOptions() {
      return this.allOptionsWithCount('connection').map(option => ({
        label: `${option.label}`,
        value: option.value
      }));
    },
    pageCount() {
      console.log(this.totalFilteredItems);
      return Math.ceil(this.totalFilteredItems / this.pagination.perPage);
    },
    countTotal() {
      return this.totalFilteredItems;
    }
  },
  watch: {
    selectedProductType(newVal) {
      this.setFilter({ key: 'product_type', value: newVal });
      this.setPage(1);
    },
    selectedGrade(newVal) {
      this.setFilter({ key: 'grade', value: newVal });
      this.setPage(1);
    },
    selectedSize(newVal) {
      this.setFilter({ key: 'size', value: newVal });
      this.setPage(1);
    },
    selectedConnection(newVal) {
      this.setFilter({ key: 'connection', value: newVal });
      this.setPage(1); 
    },
  },
};
</script>
