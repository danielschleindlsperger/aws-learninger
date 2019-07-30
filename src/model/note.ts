export type Note = {
  /**
   * uuid v4
   */
  id: string

  title: string

  body: string

  /**
   * UTC date string
   */
  createdAt: string
}
