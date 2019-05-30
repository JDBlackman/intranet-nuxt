export default function ({ app, store, redirect }) {
  // If the user is not authenticated
  // Redirect to login page
  if(!app.$cookies.get('intranet-token')){
    return redirect('/')
  }
}
