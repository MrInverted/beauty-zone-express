export const checkAllFields = (body: object) => {
  const missed = Object.entries(body).reduce<string[]>((accum, [key, value]) => {
    if (!value) accum.push(key);
    return accum;
  }, [])

  if (missed.length) {
    return `Поля ${missed.join(", ")} не указаны`;
  }

  return '';
}