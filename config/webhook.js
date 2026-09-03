// Payment provider webhook verification
// Secret is injected via environment at deploy time — never hardcoded.
const PAYMENT_WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET;

if (!PAYMENT_WEBHOOK_SECRET) {
  console.warn("PAYMENT_WEBHOOK_SECRET is not set — webhook verification will always fail closed.");
}

function verifySignature(payload, signature) {
  if (!PAYMENT_WEBHOOK_SECRET) return false;
  return signature === PAYMENT_WEBHOOK_SECRET;
}

module.exports = { verifySignature };
