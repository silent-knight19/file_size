import { describe, it, expect } from 'vitest';
import { formatFileSize } from './formatFileSize';

describe('formatFileSize', () => {
  it('handles zero bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0 B');
  });

  it('formats byte values below 1 KB without conversion', () => {
    expect(formatFileSize(512)).toBe('512 B');
  });

  it('converts exact kilobyte boundaries using binary base 1024', () => {
    expect(formatFileSize(1024)).toBe('1.00 KB');
  });

  it('converts exact megabyte boundaries using binary base 1024', () => {
    expect(formatFileSize(1048576)).toBe('1.00 MB');
  });

  it('converts fractional megabyte values correctly', () => {
    expect(formatFileSize(1572864)).toBe('1.50 MB');
  });
});

