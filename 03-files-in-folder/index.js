const fs = require("fs");
const { resolve, join } = require("path");
const { stdout } = process;

const absPath = resolve(__dirname, "secret-folder");

fs.readdir(absPath, { withFileTypes: true }, (err, data) => {
  if (err) throw err;
  data.forEach((el) => {
    if (el.isFile()) {
      getFileInfo(el);
    }
  });
});

const getFileInfo = (file) => {
  const absFile = join(__dirname, "secret-folder", file.name);
  fs.stat(absFile, (err, stats) => {
    if (err) throw err;
    const name = file.name.split(".");
    stdout.write(`${name[0]} - ${name[1]} - ${stats.size / 1000}kb\n`);
  });
};
