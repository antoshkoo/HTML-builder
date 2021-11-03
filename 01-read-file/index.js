const fs = require("fs");
const { join } = require("path/posix");
const { stdout } = require("process");

const input = fs.createReadStream(join(__dirname, "text.txt"), "utf-8");

let data = "";
input.on("data", (chunk) => (data += chunk));
input.on("end", () => stdout.write(data));
