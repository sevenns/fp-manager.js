export default function ({ store, redirect, route }) {
  const { token, username } = store.getters['user/GET']
  const isDataOk = !!(token && username)

  if (isDataOk && route.path === '/') {
    redirect('/dashboard')
  }

  if (!isDataOk && route.path !== '/') {
    redirect('/')
  }
}
