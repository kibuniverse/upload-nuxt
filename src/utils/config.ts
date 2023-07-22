import { FileStatus } from "../store";

export const fileStatusConfigMap = new Map([
  [FileStatus.Finish, { color: "green", text: "上传完成" }],
  [FileStatus.Ready, { color: "blue", text: "待上传" }],
  [FileStatus.Uploading, { color: "red", text: "上传中" }],
  [FileStatus.Pause, { color: "yellow", text: "暂停中" }],
]);
