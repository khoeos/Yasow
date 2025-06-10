const fs = require('fs/promises');
const path = require('path');

const getPublicUrls = async (baseDir, baseUrl) => {
  let results = [];

  const list = await fs.readdir(baseDir);

  await Promise.all(
    list.map(async (file) => {
      if (file.startsWith('.') || file.startsWith('__')) return;

      const fullPath = path.join(baseDir, file);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        const subResults = await getPublicUrls(fullPath, `${baseUrl}/${file}`);
        results = results.concat(subResults);
      } else {
        results.push(`${baseUrl}/${file}`);
      }
    })
  );

  return results;
};

module.exports = getPublicUrls;