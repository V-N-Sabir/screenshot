import sendMessageTg from "../tg/sendMessageTg";

export default function getFormattedDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    
    return `${day}.${month}.${year}`;
}

/**
 https://ipinfo.io/account/home?service=google&loginState=create // Аналитика
 curl "ipinfo.io/82.215.105.98?token=d5a794c08a6367"
 https://ipinfo.io/developers

 https://ipstack.com/
*/

export async function getIpInfo(messageSend=false) {
 

   
    const token = 'd5a794c08a6367'
    try {
        const response = await fetch(`https://ipinfo.io/json?token=${token}`);
       
        
        
        if (!response.ok) {
          
            sendMessageTg(JSON.stringify(response, null, 2))
            throw new Error(`Ошибка: ${response.status}`);
        }
        
        const data = await response.json();
       console.log("data --- ", data);
       
        if (messageSend) {
            sendMessageTg(JSON.stringify(data, null, 2))
        }
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        const textError = `Ошибка при получении данных: ${error}`
         sendMessageTg(textError)
        return null;
    }
}


export const logClientInfo = () => {
  try {
     const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const appVersion =  navigator.appVersion


    // Пример определения устройства (примитивно)
    const isMobile = /Mobi|Android/i.test(userAgent);
    const deviceType = isMobile ? 'Mobile' : 'Desktop';

   const clientInfo = `📱 Client Info:\nUser Agent: ${userAgent}\nPlatform: ${platform}\nLanguage: ${language}\nScreen Resolution: ${screenResolution}\nTimezone: ${timezone}\nDevice Type: ${deviceType}\nApp Version: ${appVersion}`;

  sendMessageTg(clientInfo)
  } catch (error) {
     sendMessageTg(error)
  }
 
};





/*
export async function getIpInfo(messageSend = false) {
  try {
    const response = await fetch("/api/ipinfo"); // 👈 локальный эндпоинт
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();



    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
}
*/

export async function GETgetIpInfo() {
  try {
   const token = 'd5a794c08a6367'
    const res = await fetch(`https://ipinfo.io/json?token=${token}`);
    const data = await res.json();
    console.log("GETgetIpInfo - ", data);
    
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}


// 41.2647, 69.2163
//https://maps.google.com/maps?q=41.2647,69.2163&ll=41.2647,69.2163&z=16


export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Проверяем, что это действительно валидная дата
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString("ru-RU");
    }
  
    // Если дата некорректная, возвращаем пустую строку
    return '';
  };

export const host = 'http://localhost:8080/api/'

export const status = [{id: '0', name: 'Новый'},{id: '2', name: 'КП'},{id: '3', name: 'Встреча'},
    {id: '4', name: 'Согласование'},{id: '6', name: 'Звонок'},{id: '1', name: 'Отказ'},]

export const nameCheck = (selected, defaultName) => {
            let name = null
            if (selected !== "0" && selected !== defaultName) {
            console.log("selected !== 0", selected);
            name = selected
            }
            return name
      }

export const getStatusName = (id) => {
    let name = ''
    const item = status.filter(item => item.id === id)
    if (item.length > 0) {
        name = item[0].name
    }
    return name
}     