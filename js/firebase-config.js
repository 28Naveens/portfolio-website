import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};

export const emailJsConfig = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
};

function hasRealValue(value) {
  return typeof value === "string" && value.length > 0 && !value.startsWith("YOUR_");
}

const firebaseConfigured = Object.values(firebaseConfig).every(hasRealValue);
const emailJsConfigured = Object.values(emailJsConfig).every(hasRealValue);

let db = null;

if (firebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export function isFirebaseConfigured() {
  return firebaseConfigured;
}

export function isEmailJsConfigured() {
  return emailJsConfigured;
}

export async function saveHireRequest(payload) {
  if (!db) {
    throw new Error("Firebase is not configured. Update keys in js/firebase-config.js.");
  }

  return addDoc(collection(db, "hire_requests"), {
    name: payload.name,
    email: payload.email,
    projectDetails: payload.projectDetails,
    budget: payload.budget || "",
    sourcePage: payload.sourcePage || window.location.pathname,
    createdAt: serverTimestamp(),
  });
}
