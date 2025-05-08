document.addEventListener('DOMContentLoaded', async () => {
    const placeholder = document.getElementById('nav-placeholder');
    try {
      const resp = await fetch('/assets/includes/nav.html');
      if (!resp.ok) throw new Error(resp.statusText);
      placeholder.innerHTML = await resp.text();
    } catch (err) {
      console.error('Could not load nav:', err);
    }
  });