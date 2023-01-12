export default function timeBetween(date1, date2) {
  let diffInTime = date2.getTime() - date1.getTime();
  let diffInDays = diffInTime / (1000 * 3600 * 24);

  return Math.round(diffInDays) + " days"

}
