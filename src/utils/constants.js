export const PRIORITY = Object.freeze({
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
});

export const ordinal = (num) => {
  let ord = 'th';
  if (num % 10 === 1 && num % 100 !== 11) ord = 'st';
  else if (num % 10 === 2 && num % 100 !== 12) ord = 'nd';
  else if (num % 10 === 3 && num % 100 !== 13) ord = 'rd';

  return num + ord;
};

export const searchItems = (items, searchText) => {
  if (searchText !== '') {
    return items.filter((obj) => {
      let values =
        Object.values(obj).filter((val) => typeof val === 'object')[0] ??
        [].map((val) => val.name + val.description);

      const text =
        JSON.stringify(values) + JSON.stringify(obj.name + obj.description);

      return text.toLocaleLowerCase().includes(searchText);
    });
  }
  return [];
};

export const trimStr = (str, limit) =>
  (str?.length ?? 0) < limit ? str : str.substring(0, limit) + '...';

export const plural = (count, text, suffix) =>
  count === 1 ? count + ' ' + text : count + ' ' + text + suffix;
