import SparkMD5 from "spark-md5";

/**
 *
 * @param file 文件类型
 * @returns 该文件的 hash
 */
export async function calFileHash(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(reader.result as ArrayBuffer);
      resolve(spark.end());
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 *
 * @param files 需要分割的文件
 * @param chunkSize 每个分片的大小
 * @returns 分割后的切片列表
 */
export function createChunkList(files: File, chunkSize: number) {
  const fileChunkList = [];
  let cur = 0;
  while (cur < files.size) {
    fileChunkList.push(files.slice(cur, cur + chunkSize));
    cur += chunkSize;
  }
  return fileChunkList;
}

/**
 * 上传文件
 * @param _formData 文件表单
 * @param onProgress 上传进度回调
 * @param onCompleted 上传完成回调
 * @param onerror ​上传失败回调
 */
export function uploadFile(
  _formData: Record<string, any>,
  onProgress: (e: number) => void,
  onCompleted: () => void,
  onerror: (e: any) => void
) {
  const formData = genFromData(_formData);
  const xhr = new XMLHttpRequest();

  xhr.onerror = function error(e) {
    onerror(e);
  };

  // 分片上传完后的回调
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      onerror("服务端返回状态码错误");
    }
    onCompleted();
  };

  // 上报分片上传进度
  if (xhr.upload) {
    xhr.upload.onprogress = (e: any) => {
      if (e.total > 0) {
        const percent = (e.loaded / e.total) * 100;
        onProgress(percent);
        return;
      }
      onProgress(0);
    };
  }
  xhr.open("post", "/api/upload", true);
  xhr.send(formData);
}

function genFromData(_formData: Record<string, any>) {
  const formData = new FormData();
  Object.keys(_formData).forEach((key) => {
    formData.append(key, _formData[key]);
  });
  return formData;
}
