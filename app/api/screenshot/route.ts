import { NextResponse } from "next/server";

let chrome: any = {}
let puppeteer: any;

if (process.env.NODE_ENV === 'production') {
	chrome = require('chrome-aws-lambda');
	puppeteer = require('puppeteer-core');
} else {
	puppeteer = require('puppeteer');
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const url = searchParams.get("url");

	if (!url) {
		return NextResponse.json(
			{ error: "URL parameter is required" },
			{ status: 400 }
		);
	}
	let browser;

	let options = {};

	if (process.env.NODE_ENV === 'production') {
		options = {
			args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
			defaultViewport: chrome.defaultViewport,
			executablePath: await chrome.executablePath,
			headless: true,
			ignoreHTTPSErrors: true,
		}
	}

	try {
		browser = await puppeteer.launch(options);

		const page = await browser.newPage();
		console.log('Navigating to URL...');

		await page.goto(url);

		// TO GET THE SCREENSHOT IN BINARY FORMAT
		console.log('Taking screenshot...');
		const screenshot = await page.screenshot({ type: "png" });
		console.log('Screenshot taken successfully.');
		
		// set headers for binar response
		const init = {
			headers: {
				"Content-Type": "image/png",
			},
		};

		return new Response(screenshot, init);
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 400 }
		);
	} finally {
		if (browser) {
			await browser.close();
		}
	}
}
