export default function getTime(rawDate) {
  const arrayDate = rawDate.split(' ');
  const timeDate = arrayDate[4].toString().split(':');
  return `${timeDate[0]}:${timeDate[1]}`;
}
