// MongoDB schema/index setup for JobConnect (run with mongosh jobconnect database).
// This creates validators and indexes for the collections used by the PHP app demo.
const dbName = "jobconnect";
const target = db.getSiblingDB(dbName);

function ensureCollection(name, validator) {
  const exists = target.getCollectionNames().includes(name);
  if (!exists) target.createCollection(name, { validator, validationLevel: "moderate" });
  else target.runCommand({ collMod: name, validator, validationLevel: "moderate" });
}

ensureCollection("users", {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "email", "role", "createdAt"],
    properties: {
      _id: { bsonType: "objectId" },
      name: { bsonType: "string", minLength: 1 },
      email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
      passwordHash: { bsonType: "string", description: "Store a password hash, never plaintext." },
      role: { enum: ["seeker", "employer", "admin"] },
      profile: { bsonType: "object", properties: {
        phone: { bsonType: ["string", "null"] },
        age: { bsonType: ["int", "long", "null"], minimum: 16 },
        location: { bsonType: ["string", "null"] },
        nationality: { bsonType: ["string", "null"] },
        qualification: { bsonType: ["string", "null"] },
        experienceYears: { bsonType: ["double", "int", "long", "null"], minimum: 0 },
        expectedSalary: { bsonType: ["string", "null"] },
        employmentTypes: { bsonType: "array", items: { bsonType: "string" } },
        industries: { bsonType: "array", items: { bsonType: "string" } },
        skills: { bsonType: "array", items: { bsonType: "string" } },
        pictureUrl: { bsonType: ["string", "null"] },
        cvUrl: { bsonType: ["string", "null"] },
        bio: { bsonType: ["string", "null"] }
      }},
      company: { bsonType: "object", properties: {
        name: { bsonType: ["string", "null"] },
        location: { bsonType: ["string", "null"] },
        industry: { bsonType: ["string", "null"] },
        logoUrl: { bsonType: ["string", "null"] },
        website: { bsonType: ["string", "null"] },
        size: { bsonType: ["string", "null"] }
      }},
      createdAt: { bsonType: "date" },
      updatedAt: { bsonType: ["date", "null"] }
    }
  }
});

ensureCollection("jobs", {
  $jsonSchema: {
    bsonType: "object",
    required: ["employerId", "title", "companyName", "location", "employmentType", "description", "status", "createdAt"],
    properties: {
      employerId: { bsonType: "objectId" },
      title: { bsonType: "string", minLength: 2 },
      companyName: { bsonType: "string" },
      location: { bsonType: "string" },
      industry: { bsonType: "string" },
      employmentType: { enum: ["Full-time", "Part-time", "Internship", "Contract", "Trainee"] },
      salaryMin: { bsonType: ["double", "int", "long", "null"] },
      salaryMax: { bsonType: ["double", "int", "long", "null"] },
      currency: { bsonType: "string" },
      description: { bsonType: "string" },
      requirements: { bsonType: "array", items: { bsonType: "string" } },
      status: { enum: ["draft", "published", "paused", "closed"] },
      createdAt: { bsonType: "date" },
      expiresAt: { bsonType: ["date", "null"] }
    }
  }
});

ensureCollection("applications", {
  $jsonSchema: {
    bsonType: "object",
    required: ["jobId", "seekerId", "status", "appliedAt"],
    properties: {
      jobId: { bsonType: "objectId" },
      seekerId: { bsonType: "objectId" },
      coverLetter: { bsonType: ["string", "null"] },
      status: { enum: ["applied", "reviewing", "shortlisted", "interview", "offered", "rejected", "withdrawn"] },
      appliedAt: { bsonType: "date" },
      updatedAt: { bsonType: ["date", "null"] }
    }
  }
});

ensureCollection("invitations", {
  $jsonSchema: {
    bsonType: "object",
    required: ["jobId", "employerId", "seekerId", "status", "createdAt"],
    properties: {
      jobId: { bsonType: "objectId" },
      employerId: { bsonType: "objectId" },
      seekerId: { bsonType: "objectId" },
      message: { bsonType: ["string", "null"] },
      status: { enum: ["pending", "accepted", "declined", "cancelled"] },
      interviewAt: { bsonType: ["date", "null"] },
      videoUrl: { bsonType: ["string", "null"] },
      createdAt: { bsonType: "date" }
    }
  }
});

ensureCollection("swipes", {
  $jsonSchema: {
    bsonType: "object",
    required: ["seekerId", "jobId", "decision", "createdAt"],
    properties: {
      seekerId: { bsonType: "objectId" },
      jobId: { bsonType: "objectId" },
      decision: { enum: ["like", "pass"] },
      createdAt: { bsonType: "date" }
    }
  }
});

target.users.createIndex({ email: 1 }, { unique: true, name: "users_email_unique" });
target.jobs.createIndex({ status: 1, createdAt: -1 }, { name: "jobs_status_created" });
target.jobs.createIndex({ title: "text", companyName: "text", description: "text", industry: "text" }, { name: "jobs_text_search" });
target.jobs.createIndex({ employerId: 1, status: 1 }, { name: "jobs_employer_status" });
target.applications.createIndex({ jobId: 1, seekerId: 1 }, { unique: true, name: "application_once_per_job" });
target.applications.createIndex({ seekerId: 1, appliedAt: -1 }, { name: "applications_by_seeker" });
target.invitations.createIndex({ seekerId: 1, status: 1 }, { name: "invitations_by_seeker" });
target.swipes.createIndex({ seekerId: 1, jobId: 1 }, { unique: true, name: "swipe_once_per_job" });

print(`JobConnect validators and indexes configured in ${dbName}.`);
