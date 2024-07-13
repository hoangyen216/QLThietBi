
export const useselectWarehouse = defineStore('global', {
    state: () => ({
        selectWarehouse: 1 as number, // Initialize with a number
    }),
    getters: {
        // Define getters as needed
    },
    actions: {
        setSelectWarehouse(WarehouseId:number){
            this.selectWarehouse = WarehouseId
        },
        getSelectWarehouse(){
            return this.selectWarehouse
        }
    },
});