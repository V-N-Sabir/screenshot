'use server';

export default async function sendTelegramFetch(
  text = '',
  data = '',
  token,
  chatID = '',
  userName = ''
) {
  const id = '1297832050';
 // const TOKEN = token || process.env.TG_TOKEN; // Лучше хранить токен в env
 const TOKEN = '7361329612:AAGjZlj4VINK75Tm3FiVNId9eQVEqWitkIU'
  try {
    // Отправка текста
    if (text) {
      const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: id,
          text,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Ошибка Telegram API sendMessage: ${err}`);
      }
    }

    // Отправка файла JSON (если data передан)
    if (data) {
      const formData = new FormData();
      formData.append(
        'document',
        new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
        `${userName || 'user'}_leads.json`
      );
      formData.append('chat_id', id);

      const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendDocument`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Ошибка Telegram API sendDocument: ${err}`);
      }
    }

    return 'ok';
  } catch (error) {
    const erMsg = `Ошибка при отправке в Telegram: ${error.message}`;
    console.error(erMsg);
    return erMsg;
  }
}
