export const convertTimestampToDateString = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toISOString();
}