import { reactive } from "vue";

export enum FileStatus {
  Ready = "ready",
  Uploading = "uploading",
  Finish = "finish",
  Pause = "pause",
}
export type FileItem = {
  id: string;
  file: File;
  status: FileStatus;
  uploadProgress: number;
  resourceUrl?: string;
  name: string;
};
export type FileCardProps = Omit<FileItem, "file">;
export type Store = {
  files: Array<FileItem>;
  selectShowStatus?: FileStatus;
  finishFile: (i: number) => void;
  addFile: (files: File | FileList) => void;
  updateFileUploadProgress: (i: number, progress: number) => void;
  uploadFile: (id: string | Array<string>) => void;
  pauseFile: (id: string | Array<string>) => void;
  updateSelectShowStatus: (status?: FileStatus) => void;
};
let i = 0;
function genId() {
  return String(i++);
}
export const store = reactive<Store>({
  files: [],
  finishFile(i: number) {
    this.files[i].status = FileStatus.Finish;
  },
  addFile(files) {
    if (files instanceof FileList) {
      for (const file of files) {
        this.files = this.files.concat({
          id: genId(),
          file,
          status: FileStatus.Ready,
          uploadProgress: 0,
          name: file.name,
        });
      }
      return;
    }
    this.files = this.files.concat({
      id: genId(),
      file: files,
      status: FileStatus.Ready,
      uploadProgress: 0,
      name: files.name,
    });
  },
  /**
   * 更新文件上传进度 
   * @param i 文件的索引
   * @param progress 需要更新的进度
   */
  updateFileUploadProgress(i, progress) {
    this.files[i].uploadProgress = progress;
  },
  uploadFile(id) {
    if (typeof id === "string") {
      const file = this.files.find((item) => item.id === id);
      if (file) {
        file.status = FileStatus.Uploading;
        file.uploadProgress = 10; // fake need to remove
      }
      return;
    }
    for (const i of id) {
      const file = this.files.find((item) => item.id === i);
      if (file) {
        file.status = FileStatus.Uploading;
      }
    }
  },
  pauseFile(id) {
    if (typeof id === "string") {
      const file = this.files.find((item) => item.id === id);
      if (file) {
        file.status = FileStatus.Pause;
      }
      return;
    }
    for (const i of id) {
      const file = this.files.find((item) => item.id === i);
      if (file) {
        file.status = FileStatus.Pause;
      }
    }
  },
  updateSelectShowStatus(status) {
    this.selectShowStatus = status;
  },
});
