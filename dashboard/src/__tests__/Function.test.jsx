import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Function from "../components/Stats/Function";
import { describe, expect } from "vitest";

describe('Function component', () => {
    test('renders Function component', () => {
        render(<Function />);
        screen.debug();
    });

    
});
