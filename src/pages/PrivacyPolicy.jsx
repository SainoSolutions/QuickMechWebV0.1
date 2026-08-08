import LegalDocument from './LegalDocument';

export default function PrivacyPolicy() {
  return (
    <LegalDocument title="Privacy Policy" updated="26 July 2026">
      <p>
        Quick Mech (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates doorstep vehicle service apps and
        related websites. This Privacy Policy explains how we collect, use, store, and share
        personal information when you use our customer app, partner app, website, or related
        services (together, the &quot;Services&quot;).
      </p>

      <h2>1. Information we collect</h2>
      <p>Depending on how you use the Services, we may collect:</p>
      <ul>
        <li>
          <strong className="text-white">Account details</strong> — name, email address, phone
          number, and profile photo.
        </li>
        <li>
          <strong className="text-white">Service details</strong> — vehicle information, service
          addresses, booking history, chat messages with support or partners, and payment status.
        </li>
        <li>
          <strong className="text-white">Location data</strong> — approximate or precise location
          when you allow it, so we can match nearby partners and show service areas.
        </li>
        <li>
          <strong className="text-white">Device and usage data</strong> — app version, device type,
          crash logs, and basic analytics needed to keep the Services reliable.
        </li>
        <li>
          <strong className="text-white">Partner onboarding data</strong> — identity and business
          documents you upload when applying as a service partner.
        </li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>Create and manage your account</li>
        <li>Process bookings, payments, refunds, and job assignments</li>
        <li>Enable in-app chat and customer support</li>
        <li>Send service updates, OTPs, and important notices</li>
        <li>Improve safety, prevent fraud, and meet legal obligations</li>
        <li>Improve product quality and performance</li>
      </ul>

      <h2>3. Sharing of information</h2>
      <p>We may share information with:</p>
      <ul>
        <li>Assigned service partners so they can complete your booking</li>
        <li>Payment processors (for example Razorpay) to process transactions</li>
        <li>Infrastructure and analytics providers who process data on our behalf</li>
        <li>Authorities when required by law or to protect rights and safety</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>4. Data retention</h2>
      <p>
        We keep personal data only as long as needed for the purposes above, including legal,
        accounting, and dispute-resolution requirements. You may request deletion of your account
        subject to those obligations.
      </p>

      <h2>5. Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect your information.
        No method of transmission or storage is completely secure; please use a strong password
        and keep your login details private.
      </p>

      <h2>6. Your choices</h2>
      <ul>
        <li>Update profile details in the app</li>
        <li>Control location permissions in your device settings</li>
        <li>
          Contact us at{' '}
          <a href="mailto:support@quickmech.in">support@quickmech.in</a> to request access,
          correction, or deletion where applicable
        </li>
      </ul>

      <h2>7. Children</h2>
      <p>
        The Services are not directed to children under 18. If you believe we have collected
        information from a minor, contact us and we will take appropriate steps.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
        the top will change when we do. Continued use of the Services after an update means you
        accept the revised policy.
      </p>

      <h2>9. Contact</h2>
      <p>
        Quick Mech
        <br />
        Email:{' '}
        <a href="mailto:support@quickmech.in">support@quickmech.in</a>
        <br />
        Phone: +91 8787451886 / +91 9774336670
      </p>
    </LegalDocument>
  );
}
