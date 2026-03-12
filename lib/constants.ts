/**
 * Centralized constants for URLs and contact information.
 * Update these values when links or contact details change.
 */

/** Checkout URL for plan subscriptions (evo-totem / W12) */
export const CHECKOUT_URL =
  "https://evo-totem.w12app.com.br/panobiancos/312/site/DBFZAlP1qByypx5j5uphag%5BEQUAL%5D%5BEQUAL%5D";

/** WhatsApp business number (E.164 format) */
export const WHATSAPP_PHONE = "5512992192268";

/** Plain WhatsApp chat link */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`;

/** WhatsApp link with pre-filled message for plano avulso */
export const WHATSAPP_AVULSO = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=Ol%C3%A1!%20Gostaria%20de%20saber%20sobre%20o%20plano%20avulso.`;

/** WhatsApp link with pre-filled message for treino personalizado */
export const WHATSAPP_PERSONAL = `${WHATSAPP_URL}?text=${encodeURIComponent("Olá! Eu vim do site e tenho interesse em um acompanhamento personalizado com um personal.")}`;

/** WhatsApp link with pre-filled message for aula experimental (agendamento) */
export const WHATSAPP_AULA_EXPERIMENTAL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent("Olá, vim do site e gostaria de agendar uma aula experimental.")}`;

/** Google Maps location URL */
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/VsDJ6rDYJjea2H9Y7";

/** Social media URLs */
export const INSTAGRAM_URL = "https://instagram.com/panobiancosjcsatelite";
export const FACEBOOK_URL = "https://facebook.com/panobiancosjcsatelitesp";
export const YOUTUBE_URL = "https://youtube.com/@panobianco";

/** Contact email */
export const CONTACT_EMAIL = "contato@panobiancosjc.com.br";

/** Phone number formatted for display */
export const PHONE_DISPLAY = "(12) 9219-2268";
