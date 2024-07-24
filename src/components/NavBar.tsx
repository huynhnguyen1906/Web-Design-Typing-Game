import Style from "@styles/components/NavBar.module.scss";
import { FaTrophy } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
export default function NavBar() {
	return (
		<div className={Style.navBar}>
			<div className={Style.IconBox}>
				<FaPlay className={Style.icon} color="##d9d9d9" />
				<FaUser className={Style.icon} color="##d9d9d9" />
				<FaTrophy className={Style.icon} color="##d9d9d9" />
			</div>
			<div className={Style.IconBox}>
				<FaWrench className={Style.icon} color="##d9d9d9" />
				<FaQuestion className={Style.icon} color="##d9d9d9" />
			</div>
		</div>
	);
}
