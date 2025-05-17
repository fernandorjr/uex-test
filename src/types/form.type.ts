export type TErrorForm<T> = {
  [k in keyof T]: string
}
