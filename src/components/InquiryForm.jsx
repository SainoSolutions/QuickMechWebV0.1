import { useState } from 'react';
import { send } from '@emailjs/browser';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { BRAND } from '../data/site';
import { Reveal } from './motion';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue =
      name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: normalizedValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Invalid email';
    if (!formData.phone.trim()) next.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.trim()))
      next.phone = 'Enter a 10-digit mobile number starting with 6–9';
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSending(true);
    setSubmitError('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError('Contact form is temporarily unavailable. Email us instead.');
      setIsSending(false);
      return;
    }

    send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
      publicKey,
    )
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      })
      .catch(() => setSubmitError('Could not send. Try again or email support.'))
      .finally(() => setIsSending(false));
  };

  const fieldClass =
    'w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--mute)] focus:border-brand';

  return (
    <section id="contact" className="relative scroll-mt-24 wash-contact px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
            Talk to the garage
          </h2>
          <p className="mt-3 text-[var(--mute)]">
            Questions about bookings, partnerships, or the Play Store launch — we’re here.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3 text-[var(--ink-soft)]">
              <Mail className="h-4 w-4 text-brand" />
              <a href={`mailto:${BRAND.supportEmail}`} className="hover:text-brand">
                {BRAND.supportEmail}
              </a>
            </li>
            <li className="flex items-center gap-3 text-[var(--ink-soft)]">
              <Phone className="h-4 w-4 text-brand" />
              <a href={`tel:${BRAND.supportPhone.replace(/\s/g, '')}`} className="hover:text-brand">
                {BRAND.supportPhone}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal>
          <div className="surface rounded-2xl p-6 shadow-[var(--shadow)] sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle className="h-10 w-10 text-brand" />
                <p className="font-display text-xl font-bold text-[var(--ink)]">Message sent</p>
                <p className="text-sm text-[var(--mute)]">We’ll get back to you soon.</p>
                <button
                  type="button"
                  className="mt-2 text-sm font-semibold text-brand"
                  onClick={() => setSubmitted(false)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {[
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'phone', label: 'Phone', type: 'tel' },
                ].map((f) => (
                  <label key={f.name} className="block text-sm">
                    <span className="mb-1.5 block font-medium text-[var(--ink)]">{f.label}</span>
                    <input
                      name={f.name}
                      type={f.type}
                      value={formData[f.name]}
                      onChange={handleInputChange}
                      className={fieldClass}
                    />
                    {errors[f.name] ? (
                      <span className="mt-1 block text-xs text-red-500">{errors[f.name]}</span>
                    ) : null}
                  </label>
                ))}
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-[var(--ink)]">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={fieldClass}
                  />
                  {errors.message ? (
                    <span className="mt-1 block text-xs text-red-500">{errors.message}</span>
                  ) : null}
                </label>
                {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-deep disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  {isSending ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
