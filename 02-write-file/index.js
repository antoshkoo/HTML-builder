const fs = require("fs");
const { resolve } = require("path");
const { stdin, stdout } = require("process");

const FILE = resolve(__dirname, "text.txt");
let output = fs.createWriteStream(FILE);

stdout.write("Enter text here: ");

stdin.on("data", (data) => {
  if (data.toString() === "exit\n") {
    stdout.write("Good bye!\n");
    process.exit();
  }
  output.write(data);
});

process.on("SIGINT", () => {
  stdout.write("\nGood bye!\n");
  process.exit();
});
