import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
	const [units, setUnits] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const API_BASE =
		process.env.NODE_ENV === "development"
			? `http://localhost:8000`
			: process.env.REACT_APP_BASE_URL;
	let ignore = false;
	useEffect(() => {
		if (!ignore) {
			getUnits();
		}
		return () => {
			ignore = true;
		};
	}, []);

	const getUnits = async () => {
		setLoading(true);
		try {
			await fetch(`${API_BASE}/units`)
				.then((res) => res.json())
				.then((data) => {
					console.log({ data });
					setUnits(data);
				});
		} catch (error) {
			setError(error.message || "Unexpected Error");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="App">
			<header className="App-header">
				<h1>Units:</h1>
				<ul>
					<li>Units</li>
				</ul>
			</header>
		</div>
	);
}

export default App;
