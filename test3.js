// class Storage {
//   save(key, data) {}
//   load(key) {}
// }

// class InMemoryStorage extends Storage {
//   constructor() {
//     super();
//     this.store = {};
//   }

//   save(key, data) {
//     this.store[key] = data;
//   }

//   load(key) {
//     return this.store[key];
//   }
// }

// const fs = require("fs");

// class FileStorage extends Storage {
//   save(key, data) {
//     fs.writeFileSync(key, data);
//   }

//   load(key) {
//     return fs.readFileSync(key);
//   }
// }

// function backup(storage) {
//   storage.save("config.txt", Buffer.from("123"));
//   const result = storage.load("config.txt");
//   console.assert(result.toString() === "123", "Test failed!");
// }

// backup(new InMemoryStorage());
// backup(new FileStorage());

// class FileExporter {
//   exportToCSV(data) {
//     return;
//   }

//   exportToPDF(data) {
//     return;
//   }

//   exportToExcel(data) {
//     return;
//   }
// }

// class CSVExporter extends FileExporter {
//   exportToCSV(data) {
//     console.log("Exporting data to CSV format");
//   }

//   exportToPDF(data) {
//     throw new Error("Method not implemented.");
//   }

//   exportToExcel(data) {
//     throw new Error("Method not implemented.");
//   }
// }

// function clientCode(exporter) {
//   exporter.exportToCSV("data");
// }

// clientCode(new CSVExporter());


