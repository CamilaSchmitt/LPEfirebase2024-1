import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYaBMUKkzQj_x0DapOun2yJFp6aEqcvgk",
    authDomain: "task-dash-2f9d2.firebaseapp.com",
    projectId: "task-dash-2f9d2",
    storageBucket: "task-dash-2f9d2.appspot.com",
    messagingSenderId: "37142005409",
    appId: "1:37142005409:web:abc123def456"
    // measurementId: "G-XYZ123ABC"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//export default firebaseApp;

// Configurar o provedor GitHub
const githubProvider = new GithubAuthProvider();

const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // Armazene as informações do usuário conforme necessário
      return { user, token };
    } catch (error) {
      console.error("Erro ao fazer login com GitHub", error);
      throw error;
    }
  };

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout", error);
    throw error;
  }
};

export { auth, db, loginWithGithub, logout };