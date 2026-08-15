import LegalDocument from './LegalDocument';
import { Link } from 'react-router-dom';
import { BRAND } from '../data/site';

export default function RefundPolicy() {
  return (
    <LegalDocument title="Refund Policy" updated="9 August 2026">
      <p>
        This Refund Policy explains when payments made through QuickMech may be refunded. It applies
        to customer bookings made in the QuickMech apps and related payment flows.
      </p>

      <h2>1. General</h2>
      <ul>
        <li>
          Refund eligibility depends on booking status (for example: requested, assigned,
          in progress, completed, or cancelled).
        </li>
        <li>Approved refunds are returned to the original payment method where possible.</li>
        <li>
          Processing times depend on your bank or payment provider and may take several business
          days after we approve a refund.
        </li>
      </ul>

      <h2>2. Cancellations before a mechanic starts</h2>
      <ul>
        <li>
          If you cancel before the job is started / before start OTP is verified, you may be
          eligible for a full or partial refund depending on timing and any partner dispatch costs.
        </li>
        <li>Promo-code discounts may be adjusted according to the offer terms.</li>
      </ul>

      <h2>3. After work has started or completed</h2>
      <ul>
        <li>
          Once service has started or been completed and confirmed, fees for completed work are
          generally non-refundable.
        </li>
        <li>
          If there is a quality issue covered by our warranty (for example, eligible labor or
          genuine parts within the stated warranty window), we may offer a rework, credit, or
          refund at our discretion after review.
        </li>
      </ul>

      <h2>4. Failed or duplicate payments</h2>
      <ul>
        <li>
          If a payment is captured more than once in error, contact us with the booking ID and
          payment reference. We will investigate and refund confirmed duplicates.
        </li>
        <li>
          Bank declines or pending authorizations that never complete are not charges from
          QuickMech; contact your bank if funds appear held.
        </li>
      </ul>

      <h2>5. How to request a refund</h2>
      <p>
        Email{' '}
        <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a> with:
      </p>
      <ul>
        <li>Your registered account email / phone</li>
        <li>Booking ID</li>
        <li>Payment reference (if any)</li>
        <li>Reason for the request</li>
      </ul>
      <p>We aim to respond within a reasonable time during business hours.</p>

      <h2>6. Related policies</h2>
      <p>
        See also our{' '}
        <Link to={BRAND.legal.terms}>Terms &amp; Conditions</Link> and{' '}
        <Link to={BRAND.legal.privacy}>Privacy Policy</Link>.
      </p>
    </LegalDocument>
  );
}
