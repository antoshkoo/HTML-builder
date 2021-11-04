const { resolve } = require("path");
const { readdir, copyFile, mkdir } = require("fs/promises");

absPath = resolve(__dirname, "files");
absCopyPath = resolve(__dirname, "files-copy");

async function copyPath() {
  await createCopyPath();
  const files = await readdir(absPath);
  await copyFiles(files);
}

async function createCopyPath() {
  try {
    await mkdir(absCopyPath, { recursive: true });
  } catch {
    console.log("Directory not created");
  }
}

async function copyFiles(files) {
  try {
    for (file of files) {
      absFile = resolve(__dirname, "files", file);
      absNewFile = resolve(__dirname, absCopyPath, file);
      await copyFile(absFile, absNewFile);
    }
  } catch {
    console.log("Files doesn't copied");
  }
}

copyPath();
