import * as fs from "fs";
import type { H3Event } from "h3";
import formidable from "formidable";

/**
 * 检测目标文件夹中是否存在目标文件
 */
export function checkFileExistSync(dirPath: string, fileName: string): boolean {
  return fs.existsSync(`${dirPath}/${fileName}`);
}

/**
 *
 * @param event h3 请求实例
 * @param options formidable 参数
 * @returns
 */
export function readFormFile(event: H3Event, options?: formidable.Options) {
  return new Promise<{ file: any; _fields: formidable.Fields<string> }>(
    (res, rej) => {
      const form = formidable(options);
      form.parse(event.node.req, (err, _fields, file) => {
        if (err) {
          rej(err);
        }
        res({ file, _fields });
      });
    },
  );
}

/**
 *
 * @param dirPath 需要合并的文件夹路径
 * @param targetFileDirPath 合并之后的文件存放路径
 * @param option.fileName 合并之后的文件名
 * @param option.filter 筛选需要合并的文件
 * @param option.sort 文件位置
 *
 */
export function mergeFile(
  dirPath: string,
  targetDirName: string,
  option: {
    fileName: string;
    filter: (t: string) => boolean;
    sort: (a: string, b: string) => boolean;
  },
) {}
