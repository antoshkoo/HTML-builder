const fs = require("fs");
const { resolve, join } = require("path");
const { stdout } = process;

const absPath = resolve(__dirname, "secret-folder");
const absFile = (file) => join(__dirname, "secret-folder", file);

fs.readdir(absPath, { withFileTypes: true }, (err, data) => {
  if (err) throw err;
  data.forEach((el) => {
    if (el.isFile()) {
      getFileInfo(el);
    }
  });
});

const getFileInfo = (file) => {
  fs.stat(absFile(file.name), (err, stats) => {
    if (err) throw err;
    const name = file.name.split(".");
    stdout.write(`${name[0]} - ${name[1]} - ${stats.size / 1000}kb\n`);
  });
};
