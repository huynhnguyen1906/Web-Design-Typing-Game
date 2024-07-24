"use client";
import { useState, useEffect } from "react";
import { FaCaretRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Style from "@styles/components/IndexMenu.module.scss";

const menuItems = [
	{ label: "スタート", path: "/play" },
	{ label: "プロフィール" },
	{ label: "ランキング" },
	{ label: "設定" },
	{ label: "遊び方" },
];

export default function IndexMenu() {
	const [activeIndex, setActiveIndex] = useState(0);
	const router = useRouter();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case "ArrowUp":
					setActiveIndex((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length);
					break;
				case "ArrowDown":
					setActiveIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
					break;
				case "Enter":
					if (menuItems[activeIndex].path) {
						router.push(menuItems[activeIndex].path);
					}
					break;
				default:
					break;
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [activeIndex, router]);

	return (
		<div className={Style.menu}>
			{menuItems.map((item, index) => (
				<div key={index} className={Style.menuItem}>
					<span className={index === activeIndex ? Style.active : ""}>
						<FaCaretRight />
					</span>
					<p className={index === activeIndex ? Style.activeText : ""}>{item.label}</p>
				</div>
			))}
		</div>
	);
}
