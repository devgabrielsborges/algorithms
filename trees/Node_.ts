export type Node_<T> = {
    value: T,
    left: Node_<T> | null,
    right: Node_<T> | null,
}