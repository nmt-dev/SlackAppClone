// 2022-04-12T10:36:30.854Z

export function getDate(time) {
  let converter = JSON.stringify(time);
  const monthSent = converter.slice(
    converter.indexOf("-") + 1,
    converter.lastIndexOf("-")
  );

  const daySent = converter.slice(
    converter.lastIndexOf("-") + 1,
    converter.indexOf("T")
  );

  const yearSent = converter.slice(1, 3);

  let dateSent = monthSent + "-" + daySent + "-" + yearSent;

  return dateSent;
}
export function getTime(time) {
  let converter = JSON.stringify(time);
  const hours = parseInt(
    converter.slice(converter.indexOf("T") + 1, converter.indexOf(":"))
  );
  const minutes = converter.slice(
    converter.indexOf(":") + 1,
    converter.lastIndexOf(":")
  );
  let timeSent;
  let phHours = hours + 8;

  if (phHours + 8 === 24) {
    timeSent = `0:${minutes} AM`;
  }
  if (phHours + 8 < 12) {
    timeSent = `${phHours}:${minutes} AM`;
  }
  if (phHours + 8 === 12) {
    timeSent = `${phHours}:${minutes} NN`;
  }
  if (phHours + 8 > 12) {
    timeSent = `${phHours - 12}:${minutes} PM`;
  }

  return timeSent;
}
