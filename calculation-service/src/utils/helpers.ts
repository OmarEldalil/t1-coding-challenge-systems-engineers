export const convertDateStringToTimestamp = (dateString: string): number => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: ${dateString}`);
    }
    return date.getTime();
}
