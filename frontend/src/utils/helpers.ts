export function isValidShortname(str: string) {
  const pattern = new RegExp("^[a-z0-9]+$");

  return pattern.test(str);
}

const URLPattern = new RegExp(
  "^(https?:\\/\\/)" + // protocol
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
  "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  "(\\:\\d+)?(\\/[a-z\\d%_.~+@\\-]*)*" + // port and path
  "(\\?[;&a-z\\d%_.~+=\\-@]*)?" + // query string
    "(\\#[a-z\\d_\\-]*)?$",
  "i"
); // fragment locator

export function isValidURL(str: string) {
  return URLPattern.test(str);
}
