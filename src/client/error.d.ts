export interface ErrorResponse extends Error {
  status: number
  error: { msg: string }
}