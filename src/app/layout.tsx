import "@styles/GlobalStyles.scss";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "WEB打 - タイピング速度を上げるウェブゲーム",
	description: "タイピングの内容はWebに関連するキーワード。Webのコーディング基礎力向上するためのウェブゲームです。",
	viewport: "width=device-width, initial-scale=1.0",
	keywords: "タイピング, ウェブゲーム, コーディング, 学生, WEB打",
	authors: [{ name: "居眠りぼーいず" }],
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "WEB打 - タイピング速度を上げるウェブゲーム",
		description: "タイピングの内容はWebに関連するキーワード。Webのコーディング基礎力向上するためのウェブゲームです。",
		url: "https://typing-game-eight-eta.vercel.app/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}
