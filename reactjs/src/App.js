import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Unit from "./pages/Unit";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/units/:id" exact element={<Unit />} />
				<Route path="/dashboard" exact element={<Dashboard />} />
				<Route path="/" exact element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
