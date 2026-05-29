// Detección temprana de error en el hash (token expirado/usado).
// Se carga ANTES del módulo de Supabase para redirigir cuanto antes.
(function checkExpired() {
  var raw = location.hash || '';
  if (raw.charAt(0) === '#') raw = raw.slice(1);
  var params = new URLSearchParams(raw);
  var err = params.get('error') || params.get('error_code');
  if (err) {
    location.replace('/auth/expirado?type=reset');
  }
})();
