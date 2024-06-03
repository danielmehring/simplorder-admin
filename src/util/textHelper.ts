import dayjs from "dayjs";

export const formatUnixToTextTimeDate = (timestamp: number) => {
    return dayjs.unix(timestamp).format("HH:mm DD-MM-YYYY");
}