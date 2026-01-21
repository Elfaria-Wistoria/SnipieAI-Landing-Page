# Environment Variables Configuration

## Webhook Secrets

Add the following environment variables to your `.env.local` file:

```bash
# Lynk.id Webhook Secret
LYNK_SECRET_KEY=your_lynk_secret_key_here

# Gumroad Webhook Secret
GUMROAD_SECRET=your_gumroad_secret_key_here
```

## Getting Your Gumroad Secret

1. Log into your [Gumroad account](https://app.gumroad.com)
2. Navigate to **Settings** → **Advanced** → **Webhooks**
3. Add a new webhook URL: `https://your-domain.com/api/webhooks/gumroad`
4. Copy the **secret key** provided by Gumroad
5. Add it to your environment variables as `GUMROAD_SECRET`

## Testing Webhooks

### Gumroad Test Webhook
Use Gumroad's "Send test ping" feature in the webhook settings to verify your endpoint is working correctly.

### Verifying Transactions
After a test purchase, check the admin dashboard at `/admin` to confirm the transaction appears in the transactions list.
