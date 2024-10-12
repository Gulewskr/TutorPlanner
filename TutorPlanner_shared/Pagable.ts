export interface Pagable<T> {
    data: T[];
    size: number;
    page: number;
    pageSize: number;
}
