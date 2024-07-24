import Style from "@styles/index.module.scss";
import NavBar from "@/components/NavBar";
import IndexMenu from "@/components/IndexMenu";
export default function Home() {
	return (
		<div className={Style.container}>
			<NavBar />
			<div className={Style.header}>
				<h1 className={Style.logo}></h1>
				<p className={Style.heroText}>君たちタイピング遅くない？笑</p>
			</div>
			<IndexMenu />
			<div className={Style.tutorial}>↑↓:選択 / Enter:決定</div>
		</div>
	);
}
