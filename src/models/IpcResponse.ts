export default interface IpcResponse<T = any> {
  success: boolean;
  content?: T;
  error?: string;
}
