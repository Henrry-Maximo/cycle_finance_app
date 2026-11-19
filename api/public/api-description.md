Cycle Finance is a personal finance management platform that helps users track where their money goes. Expenses can be recorded **manually** or by **photographing a receipt**, and the system turns that data into clear insights by day, month and year.

This documentation describes every endpoint available in **v1**, including expected inputs, responses and status codes.

## Key Features

- **Expense management:** create, view, update and delete expenses.
- **Smart receipt scanning:** upload a receipt photo and the system extracts the key details using AI (Google Gemini). It then suggests the amount and date, which the user can confirm or adjust.
- **Categories:** organize spending with custom categories (up to 15 per user).
- **Analytics:** total spent per day and per month, number of expenses, spending over time and most popular categories.
- **Filtering:** filter the expense history by period and by category.
- **Account management:** sign-up, login, profile updates, password reset by e-mail and account deletion.
- **Admin tools:** administrators can list all registered users.

## Authentication

The API uses **JWT (JSON Web Token)** authentication.

1. Create an account and sign in to receive an access token.
2. Send the token in the \`Authorization\` header of every protected request:

\`\`\`
Authorization: Bearer <your_access_token>
\`\`\`

3. When the access token expires, the session is renewed through a **refresh token**, so users are not forced to log in again.

You can try protected endpoints directly from this page using the **Authorize** button.

## Roles and Permissions

| Role       | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| \`member\` | Default role. Full access to their own expenses, categories and profile. |
| \`admin\`  | Everything a member can do, plus access to the list of all users.        |

Users can only read and modify **their own data**. Passwords are stored as secure hashes and are never exposed, not even to administrators.

## Receipt Scanning

- Accepted formats: **JPEG** and **PNG**
- Maximum file size: **5 MB**
- The image is analyzed and the response includes suggested values (such as amount and date). Nothing is saved until the user confirms the expense.

## Business Rules to Keep in Mind

- E-mail addresses must be unique.
- Category titles must be unique per user, with a maximum of **15 categories** per user.
- A category that still has expenses linked to it **cannot be deleted**.
- Deleting an account permanently removes all of its expenses and categories, and invalidates the user's active tokens.
- Password reset links expire in **15 minutes** and can be used **only once**. The new password must be different from the previous one.

## Pagination

All list endpoints are paginated, returning **15 items per page**.

## Error Handling

Errors follow a consistent format and use standard HTTP status codes:

| Status  | Meaning                                               |
| ------- | ----------------------------------------------------- |
| \`400\` | Invalid request data (validation error)               |
| \`401\` | Missing, invalid or expired token                     |
| \`403\` | Authenticated, but not allowed to perform this action |
| \`404\` | Resource not found                                    |
| \`409\` | Conflict (e.g. duplicate e-mail or category)          |
| \`429\` | Too many requests (rate limit exceeded)               |

## Roadmap

Planned for **v2**: bulk import of expenses from spreadsheets, cloud storage for receipt images, and time zone aware date handling.

> v1 is currently **in development**. Minor changes may occur before the stable release.
