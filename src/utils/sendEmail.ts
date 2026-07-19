import { env } from '@/env';
import emailjs from '@emailjs/browser'; // default import, not named
import { toast } from 'sonner';

export type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SendEmailResult =
  | { success: true }
  | { success: false; error: string };

const SERVICE_ID = env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

/**
 * Sends a contact-form message via EmailJS.
 * Call this from a client component (it relies on the browser SDK).
 */
export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<SendEmailResult> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error(
      "EmailJS is not configured. Check NEXT_PUBLIC_EMAILJS_SERVICE_ID, " +
        "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY."
    );
    const error = "Email service is not configured.";
    toast.error(error);
    return { success: false, error };
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: payload.name,
        from_email: payload.email,
        subject: payload.subject,
        message: payload.message,
      },
      { publicKey: PUBLIC_KEY }
    );

    toast.success("Your message has been sent successfully!");
    return { success: true };
  } catch (err) {
    console.error("EmailJS send failed:", err);
    const error = "Something went wrong sending your message. Please try again.";
    toast.error(error);
    return { success: false, error };
  }
}

/**
 * Sends a contact-form message directly from a <form> element ref,
 * using emailjs.sendForm (matches input `name` attributes to template
 * variables automatically, so field names must match your template).
 */
export async function sendContactEmailFromForm(
  form: HTMLFormElement
): Promise<SendEmailResult> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error("EmailJS is not configured.");
    const error = "Email service is not configured.";
    toast.error(error);
    return { success: false, error };
  }

  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, {
      publicKey: PUBLIC_KEY,
    });
    toast.success("Your message has been sent successfully!");
    return { success: true };
  } catch (err) {
    console.error("EmailJS sendForm failed:", err);
    const error = "Something went wrong sending your message. Please try again.";
    toast.error(error);
    return { success: false, error };
  }
}