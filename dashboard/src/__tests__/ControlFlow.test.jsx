import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ControlFlow from "../components/Stats/ControlFlow";
import { expect } from "vitest";

describe('ControlFlow component', () => {
    test('renders ControlFlow component', () => {
        render(<ControlFlow />);
        screen.debug();
    });

    it('renders the NewSankey component', () => {
        const appId = 'appId2';
        render(<ControlFlow appId={appId} />);
        const newSankey = screen.getByTestId('new-sankey');
        expect(newSankey).toBeInTheDocument();
    });

    it('passes the correct props to the NewSankey component', () => {
        const appId = 'appId2';
        render(<ControlFlow appId={appId} />);
        const graph = screen.getByTestId('new-sankey');
        
    });
});