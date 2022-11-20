import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import {GIST} from "./helper/helper";
import GistFileBadges from "../components/GistFileBadges";


let container: any = null;

describe('GistFileBadges',()=>{
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container?.remove();
        container = null;
    });
    const files = Object.values(GIST.files)
        .map((file) => file.language || file.type);

    render(<GistFileBadges files={files}/>)

    test("renders gist file tags correctly", () => {
        expect(screen.getByTestId("JavaScript0")).toBeInTheDocument();
        expect(screen.getByTestId("HTML1")).toBeInTheDocument();
    });
})