import {
  emailJsConfig,
  isEmailJsConfigured,
  isFirebaseConfigured,
  saveHireRequest,
} from "./firebase-config.js";

const form = document.getElementById("hireForm");
const submitButton = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");
const TARGET_EMAIL = "28naveens@gmail.com";

let emailInitialized = false;

function setStatus(kind, message) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = "form-status";
  if (kind) {
    formStatus.classList.add(kind);
  }
}

function readPayload() {
  const formData = new FormData(form);
  return {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    projectDetails: "",
    budget: "",
    sourcePage: window.location.pathname,
  };
}

function validatePayload(payload) {
  if (payload.name.length < 2) {
    return "Please enter a valid name.";
  }

  if (!payload.email.includes("@")) {
    return "Please enter a valid email address.";
  }

  return "";
}

function setSubmitting(isSubmitting) {
  if (!submitButton) return;
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? "Sending..." : "Send Hiring Request";
}

async function sendEmailNotification(payload) {
  if (!window.emailjs) {
    throw new Error("EmailJS script failed to load. Refresh and try again.");
  }

  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS is not configured. Update js/firebase-config.js.");
  }

  if (!emailInitialized) {
    window.emailjs.init({
      publicKey: emailJsConfig.publicKey,
    });
    emailInitialized = true;
  }

  return window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
    to_email: TARGET_EMAIL,
    from_name: payload.name,
    from_email: payload.email,
    reply_to: payload.email,
    project_details: "Not provided",
    budget: "Not provided",
    submitted_at: new Date().toISOString(),
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  setStatus("", "");

  const payload = readPayload();
  const validationError = validatePayload(payload);
  if (validationError) {
    setStatus("error", validationError);
    return;
  }

  setSubmitting(true);

  try {
    const firebaseReady = isFirebaseConfigured();
    const emailReady = isEmailJsConfigured();

    if (firebaseReady) {
      await saveHireRequest(payload);
    }

    if (emailReady) {
      await sendEmailNotification(payload);
    }

    form.reset();

    if (firebaseReady && emailReady) {
      setStatus("success", "Thanks. Your request was saved and an email notification was sent.");
      return;
    }

    if (firebaseReady && !emailReady) {
      setStatus("warning", "Request saved. Email notification is not configured yet.");
      return;
    }

    if (!firebaseReady && emailReady) {
      setStatus("warning", "Email sent. Firebase storage is not configured yet.");
      return;
    }

    setStatus("warning", "Submitted in demo mode. Configure Firebase and EmailJS for live storage/alerts.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send request.";
    setStatus("error", message);
  } finally {
    setSubmitting(false);
  }
}

if (form) {
  form.addEventListener("submit", handleSubmit);
}
