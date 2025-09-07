export type _Node<T> ={
  data: NonNullable<T>,
  next: _Node<T> | null;
}