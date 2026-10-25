const all = require("./export-pdf-guides.cjs");
process.stdout.write(JSON.stringify(all.filter(item => !["first-week", "travel-kit"].includes(item.id))));
