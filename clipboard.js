export function setupClipboard(element, value) {
  element.style.cursor = 'pointer';
  element.title = 'Click to copy';
  
  element.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(value);
      const originalText = element.textContent;
      element.textContent = 'Copied!';
      setTimeout(() => {
        element.textContent = originalText;
      }, 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });
}