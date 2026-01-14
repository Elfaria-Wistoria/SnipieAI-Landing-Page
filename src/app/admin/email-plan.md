# Email Blast Feature Implementation

I will implement a feature allowing admins to send emails to all newsletter subscribers directly from the dashboard.

## Technology Choice
I have chosen **Resend** for this implementation because:
- It is the modern standard for Next.js applications.
- It has a first-party SDK that maintains type safety.
- It simplifies handling email delivery compared to raw SMTP.

## Components

### 1. Server Action: `sendNewsletter`
Located in `src/app/actions/newsletter.ts`.
- **Input**: `subject`, `content` (string)
- **Logic**:
  - Authenticate user (Admin check via RLS or Session).
  - Fetch all verified emails from `newsletter_subscribers`.
  - Use `resend.emails.send` (or batch) to send the email.
  - Return success/failure statistics.

### 2. Admin UI: `/admin/subscribers`
- Add a "Send Email" Button next to "Export CSV".
- **Modal Component**: `SendEmailModal`
  - Fields: Subject (Input), Message (Textarea).
  - Actions: Cancel, Send (with loading state).

## Configuration
The user will need to add `RESEND_API_KEY` to their environment variables. I will gracefully handle the case where it's missing by showing an error in the server action.

## Security
- Ensure only authenticated admins can call the sending action.
- Validate inputs (Subject/Content) to prevent empty sends.
