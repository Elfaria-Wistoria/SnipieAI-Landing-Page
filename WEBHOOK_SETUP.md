# Environment Variables Configuration

## Webhook Secrets

Add the following environment variables to your `.env.local` file:

```bash
# Lynk.id Webhook Secret
LYNK_SECRET_KEY=your_lynk_secret_key_here

# Gumroad Webhook Secret
GUMROAD_SECRET=your_gumroad_secret_key_here
```

## Getting Your Lynk.id Secret

1. Log into your **Lynk.id Dashboard**.
2. Navigate to **Settings** → **Integrations** → **Webhooks**.
3. Enter your Webhook URL: `https://www.clasely.com/api/webhooks/lynk`
4. Click **Save**.
5. A **Merchant Key** (or Secret Key) will appear.
6. Copy this value and add it to your `.env.local` as `LYNK_SECRET_KEY`.

## Getting Your Gumroad Secret

**Important:** You must create an "Application" to generate a secret key for webhook verification.

1. Log into your [Gumroad account](https://app.gumroad.com)
2. Navigate to **Settings** → **Advanced**
3. Scroll down to the **Applications** section (or "OAuth Applications")
4. Click **"Create new application"** (Name it something like "My Store Webhook")
   - _Redirect URI_ can be your homepage: `https://www.clasely.com`
5. Once created, click on the application name to reveal details.
6. Find the **Application Secret** (sometimes called `Client Secret`).
7. Copy this value and add it to your `.env.local` as `GUMROAD_SECRET`.

## Setting up the Webhook URL

1. In the same **Settings** → **Advanced** page.
2. Look for the **Ping** section.
3. Paste your webhook URL: `https://www.clasely.com/api/webhooks/gumroad`
4. Click **"Update account details"** to save.

## Testing Webhooks

### Gumroad Test Webhook

Use Gumroad's "Send test ping" feature in the webhook settings to verify your endpoint is working correctly.

### Verifying Transactions

After a test purchase, check the admin dashboard at `/admin` to confirm the transaction appears in the transactions list.
