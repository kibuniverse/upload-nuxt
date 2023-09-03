import { readFormFile } from "../utils";
import { logger } from "../utils/logger";
export default defineEventHandler(async (event) => {
  const { file, _fields } = await readFormFile(event, { keepExtensions: true });

  logger.info(_fields);
  return {
    hello: "world",
  };
});
