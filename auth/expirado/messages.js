(function init() {
  var params = new URLSearchParams(location.search);
  var rawType = params.get('type') || 'generic';

  var messages = {
    reset: {
      icon: '🔐',
      title: 'El enlace de recuperación ya no es válido',
      body: 'Los enlaces para restablecer la contraseña expiran rápido por seguridad. Vuelve a iniciar sesión y pide uno nuevo desde "Olvidé mi contraseña".',
    },
    signup: {
      icon: '✉️',
      title: 'El enlace de verificación expiró',
      body: 'Tu enlace de confirmación ya expiró o fue usado. Abre la app y pide un nuevo correo de verificación.',
    },
    generic: {
      icon: '⏳',
      title: 'Este enlace ya no es válido',
      body: 'El enlace expiró o ya fue usado. Solicita uno nuevo desde la app.',
    },
  };

  // Whitelist explícito para evitar lookups del prototipo (__proto__, constructor, etc.)
  var allowed = ['reset', 'signup', 'generic'];
  var type = allowed.indexOf(rawType) !== -1 ? rawType : 'generic';
  var msg = messages[type];
  document.getElementById('icon').textContent = msg.icon;
  document.getElementById('title').textContent = msg.title;
  document.getElementById('body').textContent = msg.body;
  document.title = msg.title + ' · Mach-T';
})();
