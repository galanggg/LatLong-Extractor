import { setupClipboard } from './clipboard.js';
import { saveLastUrl } from './storage.js';

function getData(form, latElement, longElement) {
  var formData = new FormData(form);
  const value = Object.fromEntries(formData);

  // Save URL to storage
  saveLastUrl(value.name);

  // Regular expression to match latitude and longitude
  const regex = /!8m2!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
  const match = value.name.match(regex);

  if (match) {
    const lat = match[1];
    const lng = match[2];

    latElement.textContent = lat;
    longElement.textContent = lng;

    // Setup clipboard functionality for both elements
    setupClipboard(latElement, lat);
    setupClipboard(longElement, lng);

    return [{ lat, lng }];
  } else {
    latElement.textContent = '';
    longElement.textContent = '';
    return [];
  }
}

export function setupFormData(element, latElement, longElement) {
  element.addEventListener('submit', function (e) {
    e.preventDefault();
    getData(e.target, latElement, longElement);
  });
}