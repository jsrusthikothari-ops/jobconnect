# MongoDB data model

Database: `jobconnect`

- **users** — authentication identity plus seeker `profile` or employer `company` subdocument. `role` is `seeker`, `employer`, or `admin`.
- **jobs** — jobs created by employers; references employer using `employerId`.
- **applications** — one application per seeker/job pair; tracks review and hiring status.
- **invitations** — employer interview invitations, schedule, and optional video-call URL.
- **swipes** — job-seeker like/pass decisions for swipe-style discovery.

## Run the schema

```bash
mongosh "mongodb://127.0.0.1:27017/jobconnect" database/schema.js
mongosh "mongodb://127.0.0.1:27017/jobconnect" database/sample-data.js
```

## Notes
MongoDB schema validation and indexes are defined in `schema.js`. Use BSON `ObjectId` references between collections. Keep uploaded CVs/photos in controlled file/object storage and store only their URLs in MongoDB. Never store plain-text passwords; use PHP `password_hash()` and `password_verify()`. This project UI currently uses PHP session demo data; the MongoDB schema is prepared for the next integration step, but PHP pages do not yet read/write MongoDB.
