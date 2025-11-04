////////////////// Fake auth (mock role/user)
// Toggle isAuth to true to bypass real auth guards for quick role-based UI testing
const fakeAuth = {
  isAuth: true, // set true to enable fake auth
  role: 'admin', // 'customer' | 'driver' | 'admin'
};

export default fakeAuth;


