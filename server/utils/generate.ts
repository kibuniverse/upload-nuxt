import { Status } from "@/share_config";

export function genSuccessResponse<T = Record<string, any>>(data: T) {
  return {
    status: Status.Success,
    ...data,
  } as { status: Status.Error } & T;
  ;
}
export function genErrorResponse<T = Record<string, any>>(data: T) {
  return {
    status: Status.Error,
    ...data,
  } as { status: Status.Error } & T;
}

export type Response<T> = {
  status: Status;
  msg?: string;
} & T;