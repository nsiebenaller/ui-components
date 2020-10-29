const { fstat } = require("fs");
const prettier = require("prettier");

const package = require("../src/package/package.json");

// Increment version number
const v = package.version.split(".");
const new_version = `${v[0]}.${v[1]}.${parseInt(v[2]) + 1}`;
package.version = new_version;
const newPackage = prettier.format(JSON.stringify(package));

const fs = require("fs");
const path = require("path");
fs.writeFile(path.resolve("./src/package/package.json"), newPackage, (err) => {
    if (err) console.error("ERROR: ", err);
});
