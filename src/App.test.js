import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { act } from "react-dom/test-utils";
import AuthProvider, { AuthContext } from "./components/auth/Auth";

test("full app rendering/navigating", () => {
    const history = createMemoryHistory();
    //let container;
    //act(() => {
    const { container, getByText } = render(
        <Router history={history}>
            <App currentUser={null} />
        </Router>
    );
    //console.log(screen.log());

    // example: click a <Link> to /products?id=1234
    //
    //});
    expect(history.location.pathname).toBe("/");
    const span = container.querySelector('span');
    expect(span.textContent).toBe('Loading...');
    //expect(screen.findByRole).toMatch("You are home");
    //fireEvent.click(getByText(/about/i));
    //expect(container.innerHTML).toMatch("You are on the about page");
});

test("login page route", () => {
    const history = createMemoryHistory();
    const { container, getByText, getByRole } = render(
        <Router history={history}>
            <App currentUser={null} />
        </Router>
    );
    const route = "/login";
    history.push(route);
    //expect(history.location.pathname).toBe("/login");
    //    expect(getByText("Welcome")).toMatch("Welcome");
    expect(getByRole("heading")).toHaveTextContent("404 Not Found");
});
