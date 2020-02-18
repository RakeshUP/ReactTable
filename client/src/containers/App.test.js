import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

const sampleData = `Jim Smith|123 Any Street|Boston|US|02134
Jane Lee | 248 Another St.| Boston | US | 02130`;

test('renders the table according to snapshot', () => {
  const { container } = render(<App fileData={sampleData} />);
  expect(container.firstChild).toMatchSnapshot();
});
