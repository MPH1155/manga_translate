import React from 'react';
import '@testing-library/jest-dom';
import { jest, test, describe, expect } from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import { TranslationResult } from '../TranslationResult.tsx';

describe('TranslationResult', () => {
  test('does not render when imageUrl is null', () => {
    const { container } = render(<TranslationResult imageUrl={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders image when imageUrl is provided', () => {
    render(<TranslationResult imageUrl="http://example.com/image.png" />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'http://example.com/image.png');
  });
});