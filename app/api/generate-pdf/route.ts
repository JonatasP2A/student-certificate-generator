/* eslint-disable no-console */
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.url) {
      return NextResponse.json({ message: 'URL não informada' }, { status: 400 });
    }

    const response = await axios({
      method: 'post',
      url: 'https://pdfstore.dev/api/generate',
      headers: {
        authorization: 'Bearer ps_26937941186698589f5ba74c9b147038'
      },
      data: {
        projectId: 46,
        templateUrl: body.url
      }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro ao gerar PDF' }, { status: 500 });
  }
}