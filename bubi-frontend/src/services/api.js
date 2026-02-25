const BASE_URL = '/api/v1';

export async function getDestinations(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/destinations${query ? '?' + query : ''}`);
  return res.json();
}

export async function getDestination(slug) {
  const res = await fetch(`${BASE_URL}/destinations/${slug}`);
  return res.json();
}

export async function getActivities(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/activities${query ? '?' + query : ''}`);
  return res.json();
}

export async function getAccommodations(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/accommodations${query ? '?' + query : ''}`);
  return res.json();
}

export async function getAlerts() {
  const res = await fetch(`${BASE_URL}/alerts`);
  return res.json();
}

export async function register(email, password, full_name) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, full_name }),
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
