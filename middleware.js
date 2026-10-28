export const config = {
  matcher: '/:path*',
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const authValue = authHeader.split(' ')[1];
    if (authValue) {
      const [user, pwd] = atob(authValue).split(':');

      if (
        user === process.env.AUTH_USER &&
        pwd === process.env.AUTH_PASS
      ) {
        return; // အချက်အလက်မှန်ကန်ပါက Dashboard ဖွင့်ခွင့်ပေးမည်
      }
    }
  }

  // Browser ပေါ်တွင် Username/Password ရိုက်ထည့်ရန် Prompt Pop-up ခေါ်ပေးခြင်း
  return new Response('Access Denied: Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Risk Management Area", charset="UTF-8"',
    },
  });
}
