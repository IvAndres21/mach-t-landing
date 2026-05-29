// Si Supabase devolvió el link con error (token expirado/usado),
// redirigir a la página de expirado en lugar de mostrar "verificada".
// Solo se muestra "verificada" si el hash tiene una sesión real de Supabase
// (access_token o type=signup). Esto evita phishing con links directos.
(function bootstrap() {
  var raw = location.hash || '';
  if (raw.charAt(0) === '#') raw = raw.slice(1);
  var params = new URLSearchParams(raw);
  var err = params.get('error') || params.get('error_code');
  if (err) {
    location.replace('/auth/expirado?type=signup');
    return;
  }

  var hasSupabaseSession = !!(params.get('access_token') || params.get('type'));

  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile && hasSupabaseSession) {
    setTimeout(function () {
      window.location.href = 'https://mach-t.app/open?to=login';
    }, 900);
  }
})();
