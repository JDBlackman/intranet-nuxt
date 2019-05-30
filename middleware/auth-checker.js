export default function ({ app, store, redirect }) {
  // If the user is authenticated
  // send them to the dashboard
  if(app.$cookies.get('intranet-token')){
    return redirect('/dashboard')
  }
}
