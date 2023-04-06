const plural = (count, text, suffix) =>
  count === 1 ? count + ' ' + text : count + ' ' + text + suffix;
export default plural;
