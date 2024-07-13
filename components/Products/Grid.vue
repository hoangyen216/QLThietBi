<template>
  <div class="container " style="min-height: 100vh;">
    <div class="mx-3">
      <!-- <ProductsDropDownFilters @sort-item="sortItems" /> -->
      
    </div>
    <div class="main-grid d-flex p-3">
      <div class="col-11 col-md-12 col-lg-12 mx-auto" >
        <ProductsCard :cards="slicedCards" />
        <!-- <ProductsMoreButton @increment-cards="grid.showCards += 6" /> -->
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
// const store = useMainStore()

const grid = reactive({
  cards: [],
  showCards: 6,
})
// onMounted(() => reSet())
// const reSet = () => grid.cards = store.items;
const slicedCards = computed(() => grid.cards.slice(0, grid.showCards))



</script>
