import "./index.css";
// Styly z lokální implementace
import "./localstyles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "@/i18n";

// Pages
import Root from "@/routes/Root/index";
import Orders from "@/routes/Orders/index";
import OrderDetail from "@/routes/OrderDetail";
import RegistrationData from "@/routes/RegistrationData";
import Complaint from "@/routes/Complaint";
import ComplaintDetail from "@/routes/ComplaintDetail";

import ErrorPage from "@/error-page";

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
	{
		path: "/registracni-udaje",
		element: <RegistrationData />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/reklamace",
		element: <Complaint />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/reklamace/:id",
		element: <ComplaintDetail />,
		errorElement: <ErrorPage />,
	},
]);

const rootEl = document.getElementById("root");

if (rootEl) {
	ReactDOM.createRoot(document.getElementById("root")!).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</React.StrictMode>
	);
} else if (!rootEl && import.meta.env.DEV) {
	throw new Error("Root element not found");
}
