'use server'
import TelegramApi from "node-telegram-bot-api"
import fs from 'fs'
const TOKEN_bot = '7361329612:AAGjZlj4VINK75Tm3FiVNId9eQVEqWitkIU'





//https://stackoverflow.com/questions/75919630/telegram-bot-error-409-conflict-terminated-by-other-getupdates-request
//https://github.com/yagop/node-telegram-bot-api/issues/550
const sendMessageTg = async (text='', data='', token, chatID='', userName='') => {
  
  const id = chatID || '1297832050';
  const TOKEN = token || TOKEN_bot
  
  const bot = new TelegramApi(TOKEN, )//{polling: true}
    
    
   // const RuslanP = 255920262
      /* bot.on(msg => {
        // const text = msg.text
        // const chatId = msg.chat.id
         bot.sendMessage(ChatId, `${text}`)
         console.log("msg",msg);
       })*/ 
       try {
          if (text) {
            await bot.sendMessage(id, `${text}`, )
          }
          if (data) {
            const filePath = `./${userName}_leads.json`;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            await bot.sendDocument(id, filePath)
            return `${id}`
          }        
       }  catch (error) {          
          const erMsg = `Ошибка при попытке отправить файл. ${error}`
          console.log("error_TG",erMsg);
          return erMsg
       } 
    
       //bot.close()
       

}

export default sendMessageTg
