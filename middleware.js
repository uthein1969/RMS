export default function middleware(req) {
  // Static assets များနှင့် Favicon များကို မတားဆီးရန်
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Environment Variables ထဲရှိ တန်ဖိုးများနှင့် စစ်ဆေးခြင်း
    if (user === process.env.AUTH_USER && pwd === process.env.AUTH_PASS) {
      return; // အချက်အလက်မှန်ကန်ပါက Dashboard ပေးဝင်မည်
    }
  }

  // မမှန်ကန်ပါက Password ရိုက်ထည့်ရန် Browser Login Box တောင်းဆိုခြင်း
  return new Response('Access Denied: Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Risk Management System"',
    },
  });
}
