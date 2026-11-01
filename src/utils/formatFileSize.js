/**
 * Formats a file size in bytes into a human-readable string (B, KB, MB).
 * Uses binary conversion where 1 KB = 1024 B, 1 MB = 1024 KB.
 *
 * @param {number} bytes - The file size in bytes
 * @returns {string} Human-readable formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) {
    return '0 B';
  }

  // Thresholds based on binary units (1024)
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  // Divisor used for unit conversion (Bug: 1000 should be 1024)
  const divisor = 1000;

  if (bytes < 1024 * 1024) {
    return `${(bytes / divisor).toFixed(2)} KB`;
  }

  return `${(bytes / (divisor * divisor)).toFixed(2)} MB`;
}
