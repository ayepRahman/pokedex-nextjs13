export const fetcher = <T = any>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  return fetch(input, init).then((res) => res.json() as T);
};
