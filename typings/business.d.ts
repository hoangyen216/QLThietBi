

interface Device {
    id?: string;
    ten: string
    tenVietTat: string | null
    tgnhapKho?: string
    nguoiNhapKho: string
    tgbaoHanh?: string
    tgbaoDuong?: string
    tinhTrang: string
    moTaChucNang: string
    soLuong: number
    hinhanh: string| UploadFile
    huongDanSuDung: string
}

interface DataRegister {
    ten: string,
    soLuong: number,
    hinhanh: string,
    ngayMuon: string,
    ngayTra: string,
    trangThai: string
}