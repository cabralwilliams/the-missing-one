import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./index.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateCase from "./pages/CreateCase";
import NavBar2 from "./components/NavBar2";

const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	console.log("App component");
	return (
		<ApolloProvider client={client}>
			<Router>
			
        <div className="flex-column justify-flex-start min-100-vh">
          	<Header/>
						{/* <NavBar /> */}
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/Profile" component={Profile} />
								<Route exact path="/CreateCase" component={CreateCase} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/signup" component={Signup} />
								<Route component={NoMatch} />
							</Switch>
						</div>
						<Footer />
					</div>
			
			</Router>
		</ApolloProvider>
	);
}
export default App;
