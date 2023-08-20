import * as fs from 'fs'

/**
 * 检测目标文件夹中是否存在目标文件
 */
export function checkFileExistSync(dirPath: string, fileName: string): boolean {
  return fs.existsSync(`${dirPath}/${fileName}`)
}