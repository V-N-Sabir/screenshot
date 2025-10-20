import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import sendMessageTg from '@/component/tg/sendMessageTg';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get('uid');
  const email = searchParams.get('email');
  //const ip = req.headers.get('x-forwarded-for') || 'unknown';

  //console.log("searchParams ------ ", searchParams);
  
  const now = new Date();
  const gmtPlus5 = new Date(now.getTime() + 5 * 60 * 60 * 1000);
  const formatted = gmtPlus5.toISOString().replace('Z', '+05:00');

  const text = `LO: uid=${uid}, email=${email},  time=${formatted}`;
  try {
    if (email !== "send@example.com") {
      await sendMessageTg(text)
    }
  } catch (error) {
    console.log("error_sendTG --- ", error);
    
  }
  
  //-console.log('text ---', text);

  try {
    // Путь к файлу из /public
    const pixelPath = path.join(process.cwd(), 'public', 'pixel.png');
    const imageBuffer = await fs.readFile(pixelPath);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length,
      },
    });
  } catch (error) {
    console.error('Ошибка чтения pixel.png:', error);
    return new NextResponse('Not Found', { status: 404 });
  }
}
