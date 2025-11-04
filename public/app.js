const form = document.getElementById('qr-form');
const urlInput = document.getElementById('url');
const img = document.getElementById('qr-img');
const placeholder = document.getElementById('placeholder');
const downloadBtn = document.getElementById('download');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = urlInput.value.trim();
  if (!url) return;

  const src = `/api/generate?url=${encodeURIComponent(url)}`;
  img.src = src;
  img.hidden = false;
  placeholder.hidden = true;
  downloadBtn.disabled = false;
});

// Download the currently displayed QR as PNG
downloadBtn.addEventListener('click', () => {
  if (!img.src) return;
  // Create a temporary link to download
  const a = document.createElement('a');
  a.href = img.src;
  a.download = 'qr-image.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
});

// Improve UX: allow Enter key from input
urlInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    form.requestSubmit();
  }
});
