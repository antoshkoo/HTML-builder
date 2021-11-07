const { copyFile } = require("fs");
const { writeFile, readFile, readdir, rm, mkdir } = require("fs/promises");
const { resolve, extname } = require("path");

const absTemplate = resolve(__dirname, "template.html");
const absComponents = resolve(__dirname, "components");
const assets = "assets";
const absAssets = resolve(__dirname, assets);
const buildPath = resolve(__dirname, "project-dist");

rm(buildPath, { recursive: true, force: true });

async function buildProject() {
  try {
    createBuildPath();
  } catch {
    console.log("Directory not created");
  }
  try {
    createTemplate();
  } catch {
    console.log("Cant create index.html");
  }
  try {
    const data = await createCSS();
    writeFile(resolve(buildPath, "style.css"), data);
  } catch {
    console.log("Cant create style.css");
  }
  try {
    copyAssets(absAssets);
  } catch {
    console.log("Cant copy assets");
  }
}

async function createBuildPath() {
  try {
    mkdir(buildPath, { recursive: true });
  } catch {
    console.log("Directory not created");
  }
}

async function createTemplate() {
  const data = await readFile(absTemplate, "utf-8");
  insertComponents(data);
}

async function insertComponents(data) {
  const exprComp = /{{\w*}}/g;
  const allComponents = data.match(exprComp);
  for (const component of allComponents) {
    const absComponent = resolve(
      absComponents,
      `${component.slice(2, -2)}.html`
    );
    const compTemplate = await readFile(absComponent, "utf-8");
    data = data.replace(component, compTemplate);
  }
  writeFile(resolve(buildPath, "index.html"), data);
}

async function getStyles() {
  try {
    const files = await readdir(resolve(__dirname, "styles"), {
      withFileTypes: true,
    });
    css = files
      .filter((file) => file.isFile())
      .filter((file) => extname(file.name) === ".css");
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

async function copyAssets(dir, dest) {
  !dest ? (dest = "") : (dest = dest);
  await mkdir(resolve(buildPath, assets), { recursive: true }).then(
    readdir(dir, {
      withFileTypes: true,
    }).then((items) => {
      for (item of items) {
        if (item.isDirectory()) {
          mkdir(resolve(buildPath, assets, item.name), { recursive: true });
          copyAssets(resolve(absAssets, item.name), item.name);
        } else {
          absFile = resolve(absAssets, dest, item.name);
          absDir = resolve(buildPath, assets, dest, item.name);
          copyFile(absFile, absDir, (err) => {
            if (err) throw err;
          });
        }
      }
    })
  );
}

setTimeout(buildProject, 100);
