export default function dateFormat(date, format = 'YYYY-MM-DDThh:mm:ss') {
  const pad2 = (n) => n.toString().padStart(2, '0');

  const map = {
    YYYY: date.getFullYear(),
    MM: pad2(date.getMonth() + 1),
    DD: pad2(date.getDate()),
    hh: pad2(date.getHours()),
    mm: pad2(date.getMinutes()),
    ss: pad2(date.getSeconds()),
  };

  return Object.entries(map).reduce((prev, entry) => prev.replace(...entry), format);
}
