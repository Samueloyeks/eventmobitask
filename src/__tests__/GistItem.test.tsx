import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {render, screen} from '@testing-library/react';
import {GIST, GIST_WITH_FORKS} from "./helper";
import GistItem from "../components/GistItem";


let container: any = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container?.remove();
    container = null;
});

it("renders gist correctly", () => {
    render(<GistItem gist={GIST}/>)

    const gistItemIdElement = screen.getByText(GIST.id)
    expect(gistItemIdElement).toBeInTheDocument();
});

it("displays gist file badges", () => {
    render(<GistItem gist={GIST}/>)

    expect(screen.getByText("JavaScript")).toBeTruthy();
    expect(screen.getByText("HTML")).toBeTruthy();
});

it("embeds all fork links", () => {
    render(<GistItem gist={GIST_WITH_FORKS}/>)

    expect(screen.getByRole('link')).toHaveAttribute('href', 'test_fork_url');
});