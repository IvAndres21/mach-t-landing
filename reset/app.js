import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const SUPABASE_URL = 'https://ekoyzdkadgaefvlwrgsb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tCuZUYMTyTCdBIx6vvDU9Q_u8n6w2jd';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { detectSessionInUrl: true, flowType: 'implicit', persistSession: false },
});

const $ = (id) => document.getElementById(id);
const status = $('status');
const form = $('form');
const success = $('success');
const title = $('title');
const subtitle = $('subtitle');
const submit = $('submit');

function showError(msg) {
  status.className = 'status error';
  status.textContent = msg;
}
function showOk(msg) {
  status.className = 'status ok';
  status.textContent = msg;
}
function clearStatus() {
  status.className = 'status';
  status.textContent = '';
}

let ready = false;
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
    ready = true;
  }
});

setTimeout(async () => {
  const { data } = await supabase.auth.getSession();
  if (!data.session && !ready) {
    location.replace('/auth/expirado?type=reset');
  }
}, 1500);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearStatus();

  const password = $('password').value;
  const confirm = $('confirm').value;

  if (password.length < 8) return showError('La contraseña debe tener al menos 8 caracteres.');
  if (password !== confirm) return showError('Las contraseñas no coinciden.');

  submit.disabled = true;
  submit.textContent = 'Guardando...';

  const { error } = await supabase.auth.updateUser({ password });

  submit.disabled = false;
  submit.textContent = 'Guardar contraseña';

  if (error) {
    const msg = (error.message || '').toLowerCase();
    if (msg.includes('same') || msg.includes('different')) {
      return showError('La nueva contraseña debe ser diferente a la anterior.');
    }
    if (msg.includes('expired') || msg.includes('invalid')) {
      return showError('Este enlace ya fue usado o expiró. Solicita uno nuevo desde la app.');
    }
    return showError('No se pudo actualizar la contraseña. Inténtalo de nuevo.');
  }

  await supabase.auth.signOut();

  form.style.display = 'none';
  title.textContent = '¡Contraseña actualizada!';
  subtitle.textContent = 'Ya puedes iniciar sesión con tu nueva contraseña.';
  showOk('Tu contraseña se cambió correctamente.');
  success.style.display = 'flex';
});
