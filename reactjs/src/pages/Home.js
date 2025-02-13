import "../App.css";
import { Link } from "react-router-dom";
import "../styles.scss";

function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Unit Directory</h1>
				<ul>
					<Link to="/dashboard" className="nav-link">
						Dashboard
					</Link>
				</ul>
			</header>
		</div>
	);
}

export default Home;
