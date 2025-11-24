// http://localhost:3000/api/pars
import { getJsonValue } from '@/component/utils/jsonLog';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const data = await getJsonValue();

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    console.log("error_getJson --- ", error);
    // <-- Вот тут лучше тоже что-то вернуть,
    //     иначе клиент получит "Empty response".
    return new NextResponse(
      JSON.stringify({ error: "Failed to read JSON" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
