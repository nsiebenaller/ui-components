const fs = require("fs");
const path = require("path");
const package = require("../src/package/package.json");

// Increment version number
const v = package.version.split(".");
const new_version = `${v[0]}.${v[1]}.${parseInt(v[2]) + 1}`;
package.version = new_version;
const new_package = JSON.stringify(package, undefined, 4);

fs.writeFile(path.resolve("./src/package/package.json"), new_package, (err) => {
    if (err) console.error("ERROR: ", err);
});
