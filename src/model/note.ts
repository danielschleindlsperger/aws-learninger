export type Note = {
  /**
   * uuid v4
   */
  id: string

  title: string

  content: string

  /**
   * UTC date string
   */
  createdAt: string
}
