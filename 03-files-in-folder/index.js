const { readdir, stat } = require("fs");
const { resolve, join, basename, extname } = require("path");
const { stdout } = process;

const absPath = resolve(__dirname, "secret-folder");

readdir(absPath, { withFileTypes: true }, (err, data) => {
  if (err) throw err;
  data.forEach((el) => {
    if (el.isFile()) {
      getFileInfo(el);
    }
  });
});

const getFileInfo = (file) => {
  const absFile = resolve(__dirname, "secret-folder", file.name);
  stat(absFile, (err, stats) => {
    if (err) throw err;
    const ext = extname(absFile);
    const name = basename(absFile, ext);
    stdout.write(`${name} - ${ext.slice(1)} - ${stats.size / 1024}kb\n`);
  });
};
