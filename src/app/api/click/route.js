// src/app/api/click/route.js
// http://localhost:3000/api/click?target=youtube123&email=send@example.com
// https://screenshot-cyan-seven.vercel.app/api/click?target=youtube123&email=send@example.com

import { NextResponse } from 'next/server'
import sendMessageTg from '@/component/tg/sendMessageTg';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const target = searchParams.get('target')
    const email = searchParams.get('email');

    const text = `Link clicked: ${target} from ${req.headers.get('user-agent')} email=${email}`
    console.log(text)

    // Карта коротких кодов -> реальных ссылок
    const redirectMap = {
      youtube123: 'https://www.youtube.com/watch?v=rLY89HXOoOw',
    }

    // Если target — это короткий ключ, берём из карты
    let redirectUrl = redirectMap[target] //|| 'https://www.youtube.com/watch?v=7IHXbOfkMP0'

    // Если target — уже полноценный URL (начинается с http/https)
    if (!redirectUrl && target && /^https?:\/\//.test(target)) {
      redirectUrl = target
    }

    // Если ничего не подошло — дефолтный адрес
    if (!redirectUrl) {
      redirectUrl = 'https://youtu.be/rLY89HXOoOw'
    }

      try {
    if (email !== "send@example.com" && email) {
      await sendMessageTg(text)
    }
  } catch (error) {
    console.log("error_sendTG --- ", error);
    
  }

    // Выполняем редирект
    return NextResponse.redirect(redirectUrl, 302)

  } catch (error) {
    console.error('Ошибка при обработке редиректа:', error)

    // Возвращаем fallback-ответ с кодом 500
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
