export function formatDate(date: string) {
    const dateObj : Date = new Date(date);
    return dateObj.toLocaleString();
}