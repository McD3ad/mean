export interface Response<T> {
    data: T,
    meta?: Meta
}

interface Meta {
    message?: string;
    total?: number;
    next?: number;
    prev?: number;
    page?: string | number;
}