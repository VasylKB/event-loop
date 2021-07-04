"use strict";
const { promisify } = require("util");
const sleep = promisify(setTimeout);

async function bar(n, s, t) {
  setImmediate(() => process.stdout.write(s));
  await sleep(n);
  return t;
}

async function foo() {
  process.stdout.write("3");
  for (const m of await Promise.all([
    bar(20, "9 ", "11 "),
    bar(10, "10 ", "12 "),
  ]))
    process.stdout.write(m);
}

sleep(50).then(() => process.stdout.write("13 "));

new Promise((res) => {
  process.stdout.write("1");
  res("5");
})
  .then((m) => process.stdout.write(m))
  .finally(() => process.stdout.write("7"));

queueMicrotask(() => process.stdout.write("6"));

process.nextTick(() => process.stdout.write("4"));

setTimeout(() => process.stdout.write("14"), 100);

setImmediate(() => process.stdout.write("8"));

process.stdout.write("2");

foo();
