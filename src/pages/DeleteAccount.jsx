import LegalDocument from './LegalDocument';
import { BRAND } from '../data/site';

/**
 * Public account-deletion page for Google Play (and App Store) compliance.
 * Must remain reachable without logging into the app.
 */
export default function DeleteAccount() {
  return (
    <LegalDocument title="Delete your QuickMech account" updated="9 August 2026">
      <p>
        If you created a QuickMech customer account, you can request permanent deletion of that
        account and associated personal data. This page explains how.
      </p>

      <h2>1. Fastest option — in the app</h2>
      <ol>
        <li>Open the QuickMech customer app and sign in.</li>
        <li>Go to <strong className="text-white">Profile</strong>.</li>
        <li>Tap <strong className="text-white">Delete account</strong>.</li>
        <li>Confirm. Your account is deleted immediately when the request succeeds.</li>
      </ol>

      <h2>2. Request by email (no app required)</h2>
      <p>
        Email{' '}
        <a href={`mailto:${BRAND.supportEmail}?subject=${encodeURIComponent('Delete my QuickMech account')}`}>
          {BRAND.supportEmail}
        </a>{' '}
        from the email address on your account. Use the subject line{' '}
        <strong className="text-white">Delete my QuickMech account</strong> and include:
      </p>
      <ul>
        <li>Full name on the account</li>
        <li>Registered email and phone number</li>
        <li>Optional: reason for deletion</li>
      </ul>
      <p>
        We verify ownership and delete the account. We aim to complete verified requests within{' '}
        <strong className="text-white">7 days</strong> (often sooner).
      </p>

      <h2>3. What we delete</h2>
      <ul>
        <li>Account profile (name, email, phone, photo)</li>
        <li>Saved vehicles and addresses</li>
        <li>Chat messages you sent</li>
        <li>Booking and payment records tied to your customer account, where legally allowed</li>
      </ul>

      <h2>4. What we may keep temporarily</h2>
      <p>
        We may retain limited records required for tax, fraud prevention, dispute resolution, or
        law (for example payment references). Those copies are kept only as long as needed, then
        removed or anonymised.
      </p>

      <h2>5. After deletion</h2>
      <ul>
        <li>You will be signed out and cannot use the same account.</li>
        <li>Active or unfinished bookings may be cancelled as part of deletion.</li>
        <li>You can create a new account later with the same email if you choose.</li>
      </ul>

      <h2>6. Contact</h2>
      <p>
        Questions:{' '}
        <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>
        {BRAND.supportPhone ? (
          <>
            {' '}
            ·{' '}
            <a href={`tel:${BRAND.supportPhone.replace(/\s/g, '')}`}>{BRAND.supportPhone}</a>
          </>
        ) : null}
      </p>
      <p>
        See also our{' '}
        <a href={BRAND.legal.privacy}>Privacy Policy</a>.
      </p>
    </LegalDocument>
  );
}
