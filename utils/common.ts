import moment from 'moment'

export function datetimeFormat(datetime: string) {
    const date = new Date(datetime);
    return `${date.toLocaleDateString("vi-VN")}`;
}

export function formatDate(date: string){ 
    const dateFormat = moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
}

export function datetimeFormat1(datetime: string) {
    const date = new Date(datetime);
    return `${date.toLocaleTimeString("vi-VN")} ${date.toLocaleDateString("vi-VN")}`;
}