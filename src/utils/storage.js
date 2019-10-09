export function set(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function get(key) {
  const val = localStorage.getItem(key);
  if (val) {
    try {
      return JSON.parse(val);
    } catch (e) {}
  }
  return val;
}

export default {
  get,
  set
};
