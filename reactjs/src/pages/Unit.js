import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles.scss";

function Unit() {
	const [units, setUnits] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

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
			getUnit();
		}
		return () => {
			ignore = true;
		};
	}, []);

	const getUnit = async () => {
		setLoading(true);
		try {
			await fetch(`${API_BASE}/units/${id}`)
				.then((res) => res.json())
				.then((data) => {
					console.log({ data });
					const { name, faction, type } = data;
					setValues({ name, faction, type });
				});
		} catch (error) {
			setError(error.message || "Unexpected Error");
		} finally {
			setLoading(false);
		}
	};

	const deleteUnit = async () => {
		try {
			await fetch(`${API_BASE}/units/${id}`, { method: "DELETE" })
				.then((res) => res.json())
				.then((data) => {
					setUnits(data);
					navigate("/dashboard", { replace: true });
				});
		} catch (error) {
			setError(error.message || "Unexpected Error");
		} finally {
			setLoading(false);
		}
	};
	const updateUnit = async () => {
		try {
			await fetch(`${API_BASE}/units/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log({ data });
				});
		} catch (error) {
			setError(error.message || "Unexpected Error");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		updateUnit();
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
				<h1>Units</h1>
				<h2>{values && values.name}</h2>
				<h5>{values && values.faction}</h5>
				<h5>{values && values.type}</h5>
				<button onClick={() => deleteUnit()} className="button">
					Delete Unit
				</button>
				<Link to="/" className="nav-link">
					Home
				</Link>
				<Link to="/dashboard" className="nav-link">
					Dashboard
				</Link>

				<form onSubmit={(event) => handleSubmit(event)} className="unit-form">
					<label>
						Name:
						<input
							type="text"
							name="name"
							value={values.name}
							onChange={handleInputChange}
							className="input-field"
						/>
					</label>
					<label>
						Faction:
						<input
							type="text"
							name="faction"
							value={values.faction}
							onChange={handleInputChange}
							className="input-field"
						/>
					</label>
					<label>
						Type:
						<input
							type="text"
							name="type"
							value={values.type}
							onChange={handleInputChange}
							className="input-field"
						/>
					</label>
					<input type="submit" value="Submit" className="button" />
				</form>
			</header>
		</div>
	);
}

export default Unit;
