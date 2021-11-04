const fs = require("fs");
const { resolve } = require("path");
const { stdout } = require("process");

const input = fs.createReadStream(resolve(__dirname, "text.txt"), "utf-8");

let data = "";
input.on("data", (chunk) => (data += chunk));
input.on("end", () => stdout.write(data));
