export interface Purchase {
  // productId: number
  quantity: number
  warehouseID: number,
  deviceID: number,
  warehouseDescr: string,
  deviceDescr: string,
  deviceShortDescr: string,
  image: string,
  currentAmount: number,
  totalAmount: number
}

interface CartState {
  contents: Record<string, Purchase>
  // cartItems: {
  //   cartItem: Device1[],
  //   quantity: number
  // }
}

export const useMainStore = defineStore("main", {
  state: (): CartState => ({
    contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {},
    // cartItems: []
  }),
  getters: {
    // Cart Component
    // itemsNumber: ({ cartItems }): number => cartItems.length,
    count(): number {
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + this.contents[id].quantity
      }, 0)
    },
    // totalPrice: ({ cartItems }): number | undefined => {
    //   if (cartItems.length !== 1) {
    //     const sum = cartItems?.reduce((acc: number, obj: any) => {
    //       let result = acc + obj.price
    //       return result
    //     },0);
    //     return sum;
    //   }
    //   return cartItems[0].price;
    // },
    cartItems(): Purchase[] {
      return Object.keys(this.contents).map((deviceID) => this.contents[deviceID]);
    }
  },
  actions: {
    // Cart Component
    // inCart(n: object) {
    //   return this.cartItems.push(n);
    // },
    // outCart(n: string) {
    //   let index = this.cartItems.findIndex((x) => x.id === n);
    //   return this.cartItems.splice(index, 1);
    // },
    // // Info Component
    // addtoInfo(n: number) {
    //   const selectedProduct = this.items.find((item) => item.id === n);
    //   this.productInfo = selectedProduct! ;
    // },

    add(deviceID: number, product: Purchase) {
      if (this.contents[deviceID]) {
        if (this.contents[deviceID].quantity < product.currentAmount) {
          this.contents[deviceID].quantity += 1;
        }
        this.contents[deviceID].warehouseID = product.warehouseID,
          this.contents[deviceID].warehouseDescr = product.warehouseDescr,
          this.contents[deviceID].deviceDescr = product.deviceDescr,
          this.contents[deviceID].image = product.image,
          this.contents[deviceID].currentAmount = product.currentAmount
        this.contents[deviceID].totalAmount = product.totalAmount
      }
      else {
        this.contents[deviceID] = {
          deviceID,
          quantity: 1,
          warehouseID: product.warehouseID,
          warehouseDescr: product.warehouseDescr,
          deviceDescr: product.deviceDescr,
          deviceShortDescr: product.deviceShortDescr,
          image: product.image,
          currentAmount: product.currentAmount,
          totalAmount: product.totalAmount
        }
      }
    },
    adds(deviceID: number, product: Purchase, quantitys: number) {
      if (this.contents[deviceID]) {
        if (this.contents[deviceID].quantity < product.currentAmount) {
          this.contents[deviceID].quantity += quantitys;
        }
        this.contents[deviceID].warehouseID = product.warehouseID,
          this.contents[deviceID].warehouseDescr = product.warehouseDescr,
          this.contents[deviceID].deviceDescr = product.deviceDescr,
          this.contents[deviceID].image = product.image,
          this.contents[deviceID].currentAmount = product.currentAmount
        this.contents[deviceID].totalAmount = product.totalAmount
      }
      else {
        this.contents[deviceID] = {
          deviceID,
          quantity: quantitys,
          warehouseID: product.warehouseID,
          warehouseDescr: product.warehouseDescr,
          deviceDescr: product.deviceDescr,
          deviceShortDescr: product.deviceShortDescr,
          image: product.image,
          currentAmount: product.currentAmount,
          totalAmount: product.totalAmount
        }
      }
    },
    remove(deviceID: number) {
      if (!this.contents[deviceID])
        return

      this.contents[deviceID].quantity -= 1

      if (this.contents[deviceID].quantity === 0)
        delete this.contents[deviceID]
    },
    removes(deviceID: number) {
      if (!this.contents[deviceID])
        return
      delete this.contents[deviceID]
    },
    removeAll() {
      localStorage.removeItem(CART_STORAGE);
      this.contents = {}
    },

  },
});
