export default function setHeader(
  header:
    | {
      autherization?: string;
      contentType?: string;
      allowOrigin?: string;
    }
    | undefined
): object {
  return {
    Accept: "*/*",
    "Content-Type": header?.contentType || "application/json",
    "Access-Control-Allow-Origin": header?.allowOrigin,
    "Access-Control-Allow-Credentials": "true",
  };
}
