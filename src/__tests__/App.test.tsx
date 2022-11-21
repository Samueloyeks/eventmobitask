import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {render, screen, waitFor} from '@testing-library/react';
import App from "../App";
import {GIST} from "./helper/helper";


let container: any = null;
const mockGists: any = [GIST]
const mockIsLoading = false


const mock = {
    gists: [],
    isLoading: mockIsLoading,
    isError: false,
    error: null,
    hasNextPage: false
}

jest.mock('../hooks/useGists', () => ({
    __esModule: true,
    default: () => mock,
}));

describe('App', () => {
    mock.gists = mockGists;

    beforeEach(async () => {
        container = document.createElement("div");
        document.body.appendChild(container);

        // @ts-ignore
        global.IntersectionObserver = function () {
            return {
                observe: jest.fn(),
                disconnect: jest.fn(),
            };
        };
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        jest.clearAllMocks();
        container?.remove();
        container = null;
    });

    it("renders properly and fetches gists on component mount", async () => {
        render(<App/>)

        await waitFor(() => {
            expect(screen.getByText("ID: "+GIST.id)).toBeTruthy()
        })
    });
})
