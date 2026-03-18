# PayU India Dashboard Setup Guide for Standing Instructions (SI)

To enable live recurring payments (subscriptions) on WealthWise Jr., you must correctly configure your PayU India Dashboard. The code integration alone is not enough if your merchant account does not have SI enabled.

## 1. Verify/Enable Standing Instructions (SI)
By default, new PayU accounts may only support one-time payments.
1. Log in to your [PayU India Merchant Dashboard](https://onboarding.payu.in/).
2. Navigate to the **Subscriptions** or **Recurring Payments** section. If you don't see this, it might not be enabled for your account.
3. If it's missing, you MUST contact PayU Support or your PayU Key Account Manager (KAM) to request activation for **"Standing Instructions (SI) for Cards, UPI, and Netbanking"**.

## 2. Locate Your Credentials
Ensure your application is using the correct environment credentials.
1. In the PayU Dashboard, go to **Settings > Merchant Keys / Credentials**.
2. Note your **Merchant Key** and **Merchant Salt**.
3. *Important*: PayU often provides separate Key/Salt pairs for Test and Live environments. Ensure you are looking at the correct tab.

## 3. Update Vercel Environment Variables
If you are ready to go live, update your production environment variables:
1. Go to your Vercel Dashboard -> WealthWise Jr. Project -> Settings -> Environment Variables.
2. Update the following to your **LIVE** credentials:
   - `PAYU_MERCHANT_KEY`
   - `PAYU_MERCHANT_SALT`
3. Update the Base URL to point to production:
   - `PAYU_BASE_URL` = `https://secure.payu.in/_payment`
*(Currently, your code defaults to `https://test.payu.in/_payment` if this env variable is missing)*

## 4. Webhook / Callback Setup (Optional but Recommended)
While the `surl` and `furl` (success and failure URLs) handle immediate redirection, PayU SI heavily relies on server-to-server callbacks for subsequent billing cycles.
- PayU might refer to this as the "SI Webhook" or "Server to Server (S2S) Callback".
- If a webhook URL setup is required in the dashboard, point it to: `https://yourdomain.com/api/payu/callback`

## 5. Testing
Before going fully live, it's highly recommended to test the SI flow in the Test Environment.
- Set `PAYU_BASE_URL` to `https://test.payu.in/_payment` in your local/preview environment.
- Use [PayU Test Cards](https://devguide.payu.in/test-environment/) to complete a subscription.
- Ensure the transaction appears under the "Subscriptions" tab in your Test Dashboard, not just as a standard transaction.
