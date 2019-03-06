import * as querystring from 'querystring'

export default async function({ isDev, env, req, store: { commit, state }, app, redirect }) {
  // If state filled on server-side (to support spa fallback)
  // const uid=app.$cookie.get('uid')
  //  console.log(uid)
  if (req) {
    // console.log(req.headers)
  }
}

