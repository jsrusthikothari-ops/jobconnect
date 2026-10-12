# JobConnect — PHP Job Platform UI + MongoDB Schema

A responsive starter UI based on the supplied requirements for a job platform with two user types:
- Job seekers: onboarding, job discovery, job detail, apply, applications/invitations, profile.
- Employers: onboarding, candidate browsing, post jobs, dashboard and interview invitation UI.
- MongoDB schema: users, jobs, applications, invitations and swipes, with validators and indexes.

## Run the PHP UI
Requirements: PHP 8+ recommended.
```bash
php -S localhost:8000
```
Open `http://localhost:8000`.

## Demo limitations
This is a front-end PHP/session demo. Login accepts a valid-looking email and any non-empty password. Jobs/candidates are sample arrays, and applications/job posts are stored in the current PHP session. MongoDB is **not connected in the PHP pages yet**.

## MongoDB schema
Install MongoDB and `mongosh`, then run:
```bash
mongosh "mongodb://127.0.0.1:27017/jobconnect" database/schema.js
mongosh "mongodb://127.0.0.1:27017/jobconnect" database/sample-data.js
```
See `database/collections.md`.

## Important before production
Implement MongoDB access via the official PHP MongoDB extension and Composer library, secure password hashing and verification, CSRF tokens, server-side validation, file upload validation/storage, role-based authorization, rate limiting, secure session cookie settings, and privacy/consent handling. Do not use this demo login for real accounts.
