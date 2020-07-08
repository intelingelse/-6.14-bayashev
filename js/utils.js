function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  // let d = Math.floor(Math.random() * 6);
  // let n = Math.floor(Math.random() * 6);
  let d = Math.floor(Math.random() * (7 - 1)) + 1;
  let n = Math.floor(Math.random() * (6 - 0)) + 0;
  return `#slot-${d}${n}`;
}
