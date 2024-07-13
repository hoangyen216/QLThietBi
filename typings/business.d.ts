

interface Device {
    categoryId: number,
    descr: string,
    shortDescr: string,
    image: string | UploadFile,
    descrFunction: string,
    pdf: string
}

interface Account {
    userId: number,
    surname: string,
    name: string,
    phoneNumber: string,
    email: string,
    roleDescr: string,
    //   citizenId: string
}


interface Item {
    deviceId: number,
    itemId: number,
    // importDate: string,
    warrantyPeriod: number,
    maintenanceTime: number,
    lastMaintenance: string,
    status: string,
    isStored: boolean,
    posId: number,
    qr: string,
    importer: string,
    positionDescr: string
}

interface DataRegister {
    ten: string,
    soLuong: number,
    hinhanh: string,
    ngayMuon: string,
    ngayTra: string,
    trangThai: string
}

interface Position {
    posId: number,
    positionDescr: string,
    warehouseId: string,
}

interface Category {
    categoryId: number,
    descr: string,
}

interface WareHouse {
    positions: listPosition[],
    warehouseId: number,
    address: string,
    warehouseDescr: string,
}

interface listPosition {
    PosID: string,
    Position: string,
}

interface State {
    // productInfo: Product,
    cartItems: Product[],
    // items: Product[],
}

interface Product {
    deviceDescr: string,
    soluong: number,
    image: string,
    id: string
}

interface Device1 {
    warehouseID: number,
    deviceID: number,
    warehouseDescr: string,
    deviceDescr: string,
    deviceShortDescr: string,
    image: string,
    currentAmount: number,
    totalAmount: number
}

interface DeviceRegistration {
    registId: number;
    deviceId: number;
    borrowQuantity: number;
    confirmQuantity: number;
}
interface ListDetail {
    registId: number;
    deviceId: number;
    itemId: number;
    beforeStatus: string; // Handle potential capitalization inconsistency
    afterStatus: string | null; // Allow for null afterStatus
}

interface PDK {
    registId: number,
    userId: 1,
    managerId: null,
    proof: null,
    registDate: string,
    borrowDate: string,
    returnDate: string,
    status: string,
    warehouseId: number,
    actualReturnDate: null,
    actualBorrowDate: null,
    reason: string,
    notice: string,
    listDeviceRegists: listCTPDK[],
    user: null
}
interface listCTPDK {
    tenThietBi: string,
    soLuong: number,
    tinhTrangCT: string
}

interface PenaltyTicket {
    fine: boolean,
    fineList
}

interface FineList {
    lineRef: number,
    descr: string,
    fine: number
}

interface Penalty{
    penaltyId: number,
    registId: number,
    lineRef: number,
    descr: string,
    fine: number,
}

