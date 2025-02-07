import React from 'react';
import '@testing-library/jest-dom';
import { jest, test, describe, expect } from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import { ProgressDisplay } from '../ProgressDisplay.tsx';

describe('ProgressDisplay', () => {
  test('renders CircularProgress and status text', () => {
    render(<ProgressDisplay progress={50} status="Translating texts" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(/Translating texts/i)).toBeInTheDocument();
  });
});