import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Root from "./routes/Root/index";
import Orders from "./routes/Orders/index";
import OrderDetail from "./routes/Orders/detail";

import ErrorPage from "./error-page";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/muj-ucet",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/objednavky",
		element: <Orders />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/objednavka/:id",
		element: <OrderDetail />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
