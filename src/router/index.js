const router = {
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/device/' : '/',
  routes: [
    {path: '/', component: () => import('@/Pages/Home'), name: 'home'},
    {path: '/others', component: () => import('@/Pages/Childs'), name: 'foo'},
  ]
}

export default router;
