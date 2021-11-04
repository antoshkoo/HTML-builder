const { writeFile, readFile, readdir } = require("fs/promises");
const { resolve } = require("path");

async function createBundle() {
  try {
    const data = await createCSS();
    writeFile(resolve(__dirname, "project-dist", "bundle.css"), data);
  } catch {
    console.log("Can't create bundle");
  }
}

async function getStyles() {
  try {
    const files = await readdir(resolve(__dirname, "styles"), {
      withFileTypes: true,
    });
    css = files
      .filter((file) => file.isFile())
      .filter((file) => file.name.split(".")[1] === "css");
    return css;
  } catch {
    console.log("Could not read directory, or not exists css files");
  }
}

async function createCSS() {
  try {
    css = await getStyles();
    data = "";
    for (file of css) {
      try {
        text = await readFile(resolve(__dirname, "styles", file.name), "utf-8");
        data += `${text}\n`;
      } catch {
        console.log(`Can't read file ${file.name}`);
      }
    }
    return data;
  } catch {
    console.log("Can't create data");
  }
}

createBundle();
