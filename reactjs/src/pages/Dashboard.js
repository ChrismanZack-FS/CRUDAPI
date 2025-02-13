import "../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
	const [units, setUnits] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [values, setValues] = useState({
		name: "",
		faction: "",
		type: "",
	});
	const API_BASE =
		process.env.NODE_ENV === "development"
			? `http://localhost:8000/api/v1`
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

	const createUnit = async () => {
		try {
			await fetch(`${API_BASE}/units`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}).then(() => getUnits());
		} catch (error) {
			setError(error.message || "Unexpected Error");
		} finally {
			setLoading(false);
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		createUnit();
	};

	const handleInputChange = (event) => {
		event.persist();
		setValues((values) => ({
			...values,
			[event.target.name]: event.target.value,
		}));
	};
	return (
		<div className="App">
			<header className="App-header">
				<h1>Units:</h1>
				<Link to="/">Home</Link>

				<ul>
					{units &&
						units.map((unit) => (
							<li key={unit._id}>
								<Link to={`/units/${unit._id}`}>{unit.name}</Link>
							</li>
						))}
				</ul>
				<form onSubmit={(event) => handleSubmit(event)}>
					<label>
						Name:
						<input
							type="text"
							name="name"
							value={values.name}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Faction:
						<input
							type="text"
							name="faction"
							value={values.faction}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Type:
						<input
							type="text"
							name="type"
							value={values.type}
							onChange={handleInputChange}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</header>
		</div>
	);
}

export default Dashboard;
