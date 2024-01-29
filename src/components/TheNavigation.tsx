import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<header>
			<nav className="flex gap-5">
				<Link to="/muj-ucet">Přehled</Link>
				<Link to="/muj-ucet">Registrační údaje</Link>
				<Link to="/objednavky">Objednávky</Link>
				<Link to="/muj-ucet">Reklamace</Link>
				<Link to="/muj-ucet">Odhlásit se</Link>
			</nav>
		</header>
	);
};

export default Navigation;
