(function() {
    const loggedIn = document.cookie
      .split('; ')
      .some(c => c.startsWith('is_logged_in='));
    if (!loggedIn) {
      window.location.replace('index.html');
    }
  })();