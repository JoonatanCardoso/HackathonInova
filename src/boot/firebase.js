import Firebase from 'firebase/app'
import "firebase/firestore"; // eslint-disable-line
import firebaseConfig from '../../firebase.conf'
import 'firebase/analytics'

export default ({ Vue }) => {
  // Initialize Firebase from settings
  Firebase.initializeApp(firebaseConfig)
  Firebase.analytics()

  Vue.config.productionTip = false

  // alias
  Vue.prototype.$analytics = Firebase.analytics()
  Vue.prototype.$firebase = Firebase
}
