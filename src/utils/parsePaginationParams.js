function parseNumber(maybeNumber, defaultValue) {
  //ця штука перевіряє чи під час пагінації page = 1 та perPage = 10 приходять як стрічки (числа в них мають приходити у форматі стрічки "1")
  if (typeof maybeNumber !== "string") {
    return defaultValue;
  }

  const parsedNumber = parseInt(maybeNumber);
  // ця штука відсікає вже перетворені стрічки в цифри, якщо попадеться NaN (він теж являється числом)
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber; //якщо ж всі перевірки пройдені - повертаємо розпарсене число
}

function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1); // цифра 1 означає що якщо значення прийде невалідне - за замовчуванням відкриєтья перша сторінка
  const parsedPerPage = parseNumber(perPage, 10); // цифра 10 означає що якщо значення прийде невалідне - за замовчуванням відправиться 10 об`єктів на сторінку

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}

export { parsePaginationParams };
