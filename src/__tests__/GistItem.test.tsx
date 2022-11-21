import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {render, screen, waitFor} from '@testing-library/react';
import {GIST, GIST_WITH_FORKS} from "./helper/helper";
import GistItem from "../components/GistItem";
import * as GistService from '../http/gist-service';


let container: any = null;

describe('GistItem', () => {
    beforeEach(async () => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container?.remove();
        container = null;
    });

    render(<GistItem gist={GIST}/>);

    it("renders gist correctly", () => {
        const gistItemIdElement = screen.getByText("ID: "+GIST.id)
        expect(gistItemIdElement).toBeInTheDocument();
    });

    it("displays gist file badges", () => {
        render(<GistItem gist={GIST}/>);

        expect(screen.getByText("JavaScript")).toBeTruthy();
        expect(screen.getByText("HTML")).toBeTruthy();
    });

    it("embeds all fork links", () => {
        render(<GistItem gist={GIST_WITH_FORKS}/>)

        expect(screen.getByRole('link')).toHaveAttribute('href', 'test_fork_url');
    });

    describe('when forks fetch fails', () => {
        beforeEach(async () => {
            const getGistForks = jest.spyOn(GistService, 'getGistForks');
            await getGistForks
                .mockRejectedValue(new Error("unable to get forks"));
        });

        it("displays error message", async () => {
            render(<GistItem gist={GIST}/>);

            await waitFor(() => {
                expect(screen.getByTestId('fetch-forks-error')).toContainHTML("Error: unable to get forks")
            })
        });
    })
})

