export const config = {
  matcher: '/:path*',
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const authValue = authHeader.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (
      user === process.env.AUTH_USER &&
      pwd === process.env.AUTH_PASS
    ) {
      return; // အချက်အလက်မှန်ပါက App ပေးဝင်မည်
    }
  }

  return new Response('Access Denied: Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Risk Management System", charset="UTF-8"',
    },
  });
}
