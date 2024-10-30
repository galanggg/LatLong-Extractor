import './style.css';
import { setupFormData } from './app.js';
import { getLastUrl } from './storage.js';

// Detect if we're running in Chrome extension environment
const isExtension = typeof chrome !== 'undefined' && chrome.runtime;

document.querySelector('#app').innerHTML = `
<div class="wrapper">
  <div class="title">LatLong Extractor</div>
  <form id="myForm">  
    <input id="name" name="name" placeholder="input link here" type="url">
    <input class="submit-btn" type="submit" value="Extract">
  </form>
  ${
    isExtension
      ? '<button id="getCurrentUrl" class="current-url-btn">Use Current Tab URL</button>'
      : ''
  }
  <div class="lat">Latitude: <span id="lat-value"></span></div>
  <div class="long">Longitude: <span id="long-value"></span></div>
</div>
`;

const form = document.getElementById('myForm');
const input = document.getElementById('name');
const getCurrentUrlBtn = document.getElementById('getCurrentUrl');

// Load last URL when extension opens
(async () => {
  const lastUrl = await getLastUrl();
  if (lastUrl) {
    input.value = lastUrl;
    form.dispatchEvent(new Event('submit'));
  }
})();

if (isExtension && getCurrentUrlBtn) {
  getCurrentUrlBtn.addEventListener('click', async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'getCurrentUrl',
      });
      if (response?.url) {
        input.value = response.url;
        form.dispatchEvent(new Event('submit'));
      }
    } catch (error) {
      console.error('Error getting current URL:', error);
    }
  });
}

setupFormData(
  form,
  document.getElementById('lat-value'),
  document.getElementById('long-value')
);
