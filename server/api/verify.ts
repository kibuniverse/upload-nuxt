import * as fs from 'fs';
import { filePath } from '../config/path';
import { Response, genErrorResponse, genSuccessResponse } from '../utils/generate';
import { logger } from '../utils/logger';
export default defineEventHandler<VerifyResponse>((event) => {
  const query = getQuery(event)
  logger.info("Some debug messages", ['receive verify: ', query])
  const { hash_path, file_suffix } = query as VerifyQuery
  if (!hash_path) {
    return genErrorResponse({
      msg: "hash_path is required"
    })
  }

  // 根据 hash 检查文件是否已经上传
  if (checkFileExistSync(filePath.filePath, `${hash_path}.${file_suffix}`)) {
    return genSuccessResponse({ is_uploaded: true, file_resource: `${hash_path}.${file_suffix}` })
  }

  // 检查分片是否上传, 如果上传了, 返回已经上传的分片文件名，用于前段计算剩余需要上传的分片
  if (checkFileExistSync(filePath.chunkPath, hash_path)) {
    const uploadedChunks = fs.readdirSync(`${filePath.chunkPath}/${hash_path}`)
    return genSuccessResponse({ is_uploaded: false, uploaded_chunks: uploadedChunks })
  }

  // 分片和文件都没有上传
  return genSuccessResponse({ is_uploaded: false, uploaded_chunks: [] })
});

export type VerifyQuery = {
  hash_path: string;
  file_suffix: string;
}

export type VerifyResponse = Response<{
  is_uploaded?: boolean;
  file_resource?: string;
  uploaded_chunks?: string[];
}>