import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {render, screen} from '@testing-library/react';
import {GIST_WITH_FORKS} from "./helper";
import GistForks from "../components/GistForks";


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

it("renders gist forks link correctly", () => {

    render(<GistForks forks={GIST_WITH_FORKS.forks}/>)

    expect(screen.getByRole('link')).toHaveAttribute('href', 'test_fork_url');
});