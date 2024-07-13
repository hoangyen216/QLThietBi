<template>
  <div style="display: flex;">
    <el-select @change="(value: any) => { warehouseID.setSelectWarehouse(value) }" v-model="selectWarehouse" filterable
      placeholder="Lọc theo kho" style="width: 150px; margin-right: 5px; margin-bottom: 20px;">
      <el-option v-for="item in dataWareHouse" :key="item.warehouseId" :label="item.warehouseDescr"
        :value="item.warehouseId" />
    </el-select>
    <div style="width: 300px;">
      <el-input v-model="query" @input="searchDevice()" @keyup.enter="searchDevice()" clearable placeholder="Tìm Kiếm">
        <template #prefix>
          <Icon name="material-symbols-light:search" color="gray" width="26" height="26" />
        </template>
      </el-input>
    </div>
  </div>
  <div class="row" >
    <div v-for="item in data1" class="col-10 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-3 pb-3"
      :key="item.deviceID">
      <div class="card">

        <img class="card-img-top" style="object-fit: cover; height: 150px;" :src="item.image" alt="Card-image-cap"
          title="Card-image-cap" loading="lazy">

        <div class="overlay">
          <button type="button" class="btn btn-light btn-lg" @click="store.add(item.deviceID, item)">Add +</button>
          <NuxtLink :to="`/details/${item.deviceID}`">
            <button type="button" class="btn btn-light btn-lg">Info</button>
          </NuxtLink>
        </div>
        <div class="card-body">
          <h5 class="card-title">Tên: {{ item.deviceDescr }}</h5>
          <p class="card-text">Số Lượng: {{ item.currentAmount }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="d-flex justify-content-center mx-5 mx-sm-0 pt-1">
    <button type="button" class="flex-fill btn btn-outline-secondary">More
      +</button>
  </div> -->
  <el-pagination v-if="total!=0" style="position: absolute;bottom: -56px;width: 100vw;" v-model:current-page="page" @current-change="current_page()" v-model:page-size="pageSize"
    :background=true layout=" prev, pager, next" :total="(query == '' ? total : total1)" />
</template>

<script setup lang="ts">
const store = useMainStore()

const listDevice = ref<Purchase[]>()
const filterDevice = ref<Device[]>()
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const selectWarehouse = ref('');
const dataWareHouse = ref();
const warehouseID = useselectWarehouse();
const query = ref("")
const total1 = ref(0);
onMounted(() => {
  getData();
})
watch([selectWarehouse, page], async () => {
  await getData()

})

function current_page() {
  if (query.value == '') {
    getData()
  } else {
    searchDevice()
  }
}

const data1 = computed(() => {
  return query.value == '' ? listDevice.value : filterDevice.value
})
const grid = reactive({
  cards: [],
  showCards: 6,
})


async function getData() {
  const { data: deviceData } = await useFetchApi(`device/getall/${selectWarehouse.value ? selectWarehouse.value : 1}`, {
    method: 'GET',
    server: false,
    watch: false,
    query: {
      page: page,
      pageSize: pageSize
    }
  });
  if (deviceData.value) {
    const newData = deviceData.value as { itemCount: number, data: any };
    listDevice.value = newData?.data as Purchase[];
    total.value = newData.itemCount
  }
}
// const slicedCards = () => {
//   if (listDevice.value) {
//     return new Proxy(listDevice.value.slice(0, grid.showCards), {
//     });
//   } else {
//     // Handle the case where listDevice is undefined (optional)
//     return []; // or any default value you prefer
//   }
// };
// console.log(newData?.data);



const { data: warehouseData } = await useFetchApi('warehouse/getall', {
  method: 'GET',
  query: {
    page: 1,
    pageSize: 200,
  },

});
if (warehouseData.value) {
  dataWareHouse.value = (warehouseData.value as { data: any }).data;
}

async function searchDevice() {

  const { data } = await useFetchApi(`/device/getbyname/${query.value}&${warehouseID.selectWarehouse}`, {
    method: 'GET',
    server: false,
    query: {
      page: page,
      pageSize: pageSize,
    },
    watch: false

  });

  if (data.value) {
    const newData = data.value as { itemCount: number, data: any };
    filterDevice.value = newData?.data as Device[];
    console.log("filter", filterDevice.value);
    total1.value = newData.itemCount;
  }
}




</script>

<style lang="scss">
/* Card Style */
.card {
  transition: 300ms;
  position: relative;
  overflow: hidden;

  img {
    z-index: 1;
  }

  button {
    width: 140px;
    margin-bottom: 10px;
  }

  &:hover img {
    filter: blur(4px);
  }

  &:hover .overlay {
    opacity: 0.4;
  }

  .overlay {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70%;
    background-color: #232b34;
    opacity: 0;
    z-index: 100;
    transition: all 0.3s ease-in;
  }

  &:hover,
  &:active {
    transform: scaleY(1.02) scaleX(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25), 0 0px 40px rgba(0, 0, 0, 0.22);
  }
}
</style>
