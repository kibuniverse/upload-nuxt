import { reactive } from "vue";

export enum FileStatus {
  ready = "ready",
  uploading = "uploading",
  finish = "finish",
}

export type Store = {
  files: Array<{ file: File; status: FileStatus; uploadProgress: number }>;
  finishFile: (i: number) => void;
  addFile: (files: File | FileList) => void;
  updateFileUploadProgress: (i: number, progress: number) => void;
};
export const store = reactive<Store>({
  files: [],
  finishFile(i: number) {
    this.files[i].status = FileStatus.finish;
  },
  addFile(files) {
    if (files instanceof FileList) {
      for (const file of files) {
        this.files.push({
          file,
          status: FileStatus.ready,
          uploadProgress: 0,
        });
      }
      return;
    }
    this.files = this.files.concat({
      file: files,
      status: FileStatus.ready,
      uploadProgress: 0,
    });
  },
  updateFileUploadProgress(i, progress) {
    this.files[i].uploadProgress = progress;
  },
});
