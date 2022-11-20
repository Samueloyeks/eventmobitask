import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import {GIST} from "./helper";
import GistFileBadges from "../components/GistFileBadges";


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

it("renders gist file tags correctly", () => {
       const files = Object.values(GIST.files)
            .map((file) => file.language || file.type);

    render(<GistFileBadges files={files}/>)

    expect(screen.getByTestId("JavaScript0")).toBeInTheDocument();
    expect(screen.getByTestId("HTML1")).toBeInTheDocument();
});