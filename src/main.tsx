// Styly z lokální implementace
import "./localstyles.css";

// Styly pro lokální implementaci
import "./assets/index.scss";
import "./assets/utils.scss";
import "./assets/registrationData.scss";
import "./assets/orders.scss";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "@/i18n";

import "./composables/useWebConfig";

// Pages
import Root from "@/routes/Root/index";
import Orders from "@/routes/Orders/index";
import OrderDetail from "@/routes/OrderDetail";
import RegistrationData from "@/routes/RegistrationData";
import Complaint from "@/routes/Complaint";
import ComplaintDetail from "@/routes/ComplaintDetail";
import Basket from "./routes/Basket";
import UserForm from "./routes/UserForm";
import ContactForm from "./routes/ContactForm";

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
	{
		path: "/kosik",
		element: <Basket />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/muj-ucet-formular",
		element: <UserForm />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/kontakt-udaje",
		element: <ContactForm />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/error",
		element: <ErrorPage />,
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
