import fs from "fs";

export function createTranslationFiles() {
  const content = '{"test": "test"}';
  console.log("import.meta.url", import.meta.url);
  fs.writeFileSync("./public/locales/test/test.json", content, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
