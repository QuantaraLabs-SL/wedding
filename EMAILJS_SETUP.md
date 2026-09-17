# EmailJS Setup for RSVP Notifications

To get the RSVP notification emails working, you need to set up an EmailJS account and configure the environment variables in your project.

## Step 1: Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account.
2. Once logged in, go to the **Email Services** section and add a new email service (e.g., Gmail).
3. Connect your email account and note down the **Service ID**.

## Step 2: Create the RSVP Template
1. Go to the **Email Templates** section and create a new template.
2. Set the **To Email** address to `Chimaldinuwan2927@gmail.com`.
3. Set the **Subject** to: `New Wedding RSVP — {{guest_name}} | Dineth & Thathsarani`
4. Set the **Content** (Body) to:

```html
<h3>NEW WEDDING RSVP</h3>
<p><strong>Dineth & Thathsarani</strong><br>
7 October 2026<br>
Seven Say Banquet Hotel<br>
Veyangoda, Sri Lanka</p>
<hr>
<p><strong>Guest:</strong> {{guest_name}}</p>
<p><strong>Email:</strong> {{guest_email}}</p>
<p><strong>Attendance:</strong> {{attendance}}</p>
<p><strong>Number of Guests:</strong> {{guest_count}}</p>
<p><strong>Message:</strong><br>{{message}}</p>
<p><strong>Submitted:</strong> {{submitted_at}}</p>
<p><strong>Invitation:</strong> {{invitation_url}}</p>
```

5. Save the template and note down the **Template ID**.

## Step 3: Get Your Public Key
1. Go to **Account > API Keys**.
2. Note down your **Public Key**.

## Step 4: Add Variables to `.env.local`
1. Open `.env.local` in the root of your project.
2. Fill in the values you collected:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Step 5: Test the Integration
1. Restart your Next.js development server.
2. Submit a test RSVP through the application form.
3. Verify that the email successfully arrives at `Chimaldinuwan2927@gmail.com`.
