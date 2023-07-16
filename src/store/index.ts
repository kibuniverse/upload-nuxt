// store.js
import { reactive } from "vue";

type FileUploadingStatus = {
  process: number;
};

enum FileStatus {
  ready = "ready",
  uploading = "uploading",
  finish = "finish",
}

export type Store = {
  files: Array<{ file: File; status: FileStatus }>;
  finishFile: (i: number) => void;
};
export const store = reactive<Store>({
  files: [],
  finishFile(i: number) {
    this.files[i].status = FileStatus.finish;
  },
});
