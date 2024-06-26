/* eslint-disable no-console */
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.url) {
      return NextResponse.json({ message: 'URL não informada' }, { status: 400 });
    }
    console.log({
      method: 'post',
      url: process.env.NEXT_PUBLIC_PDFSTORE_API_URL,
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_PDFSTORE_API_KEY}`,
      },
      data: {
        projectId: Number(process.env.NEXT_PUBLIC_PDFSTORE_PROJECT_ID),
        templateUrl: body.url
      },
      timeout: 50000
    })
    const response = await axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_PDFSTORE_API_URL,
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_PDFSTORE_API_KEY}`,
      },
      data: {
        projectId: Number(process.env.NEXT_PUBLIC_PDFSTORE_PROJECT_ID),
        templateUrl: body.url
      },
      timeout: 50000
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro ao gerar PDF' }, { status: 500 });
  }
}