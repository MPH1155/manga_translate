import React from 'react';
import '@testing-library/jest-dom';
import { jest, test, describe, expect, beforeAll } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { ImageUpload } from '../ImageUpload';

const mockOnUpload = jest.fn();

describe('ImageUpload Component', () => {

    test('renders initial drag & drop area', () => {
      render(<ImageUpload onUpload={mockOnUpload} />);
      expect(
        screen.getByText(/drag & drop a manga page here, or click to select/i)
      ).toBeInTheDocument();
      
      expect(screen.queryByTestId('preview-image')).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/language/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /translate/i })).not.toBeInTheDocument();
    });

});