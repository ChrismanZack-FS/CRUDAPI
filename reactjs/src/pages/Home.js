import "../App.css";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Unit Directory</h1>
				<ul>
					<Link to="/dashboard">Dashboard</Link>
				</ul>
			</header>
		</div>
	);
}

export default Home;
