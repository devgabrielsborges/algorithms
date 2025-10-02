export type Node_<T> = {
    data: NonNullable<T>,
    next: Node_<T> | null;
}