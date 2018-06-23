export default (obj, key) => {
  if (!key) {
    return Object.values(obj)
  }

  return Object.values(obj).map((inner) => {
    return inner[key]
  })
}
