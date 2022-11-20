import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {render, screen} from '@testing-library/react';
import {GIST_WITH_FORKS} from "./helper/helper";
import GistForks from "../components/GistForks";


let container: any = null;

describe('GistForks', ()=>{
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container?.remove();
        container = null;
    });

    render(<GistForks forks={GIST_WITH_FORKS.forks}/>)


    it("renders gist forks link correctly", () => {
        expect(screen.getByRole('link')).toHaveAttribute('href', 'test_fork_url');
    });
})