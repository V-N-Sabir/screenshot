import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'log.json');

export async function appendJsonLog(text) {
 

  try {
    let data = [];

    // читаем существующий файл (если он есть)
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      data = JSON.parse(fileContent);
      if (!Array.isArray(data)) data = [];
    } catch {
      data = [];
    }

    // добавляем строку
    data.push(text);

    // сохраняем обратно
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

  } catch (error) {
    console.error("Ошибка записи JSON файла:", error);
  }
}



export const getJsonValue = async () => {

     const fileContent = await fs.readFile(filePath, 'utf8');
     //data = JSON.parse(fileContent);
     return fileContent
}
