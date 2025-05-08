(function() {
    const cookies = document.cookie.split('; ');
    const loggedIn = cookies.some(c => c.startsWith('is_logged_in='));
    if (!loggedIn) {
      window.location.replace('index.html');
    }
  })();