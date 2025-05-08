document.addEventListener('DOMContentLoaded', async () => {
    const placeholder = document.getElementById('widgetbot-placeholder');
    try {
      const resp = await fetch('/assets/html/widgetbot.html');
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      placeholder.innerHTML = await resp.text();
    } catch (err) {
      console.error('Could not load WidgetBot:', err);
    }
  });