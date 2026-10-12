// Optional seed data. Run after schema.js with: mongosh jobconnect database/sample-data.js
const d = db.getSiblingDB("jobconnect");
const now = new Date();
const employerId = ObjectId();
const seekerId = ObjectId();

d.users.updateOne({ email: "employer@example.com" }, { $setOnInsert: {
  _id: employerId, name: "Northstar Hiring Team", email: "employer@example.com",
  passwordHash: "REPLACE_WITH_REAL_PASSWORD_HASH", role: "employer",
  company: { name: "Northstar Labs", location: "Ahmedabad, Gujarat", industry: "Technology" },
  createdAt: now
}}, { upsert: true });

d.users.updateOne({ email: "seeker@example.com" }, { $setOnInsert: {
  _id: seekerId, name: "Aarav Mehta", email: "seeker@example.com",
  passwordHash: "REPLACE_WITH_REAL_PASSWORD_HASH", role: "seeker",
  profile: { location: "Ahmedabad, Gujarat", qualification: "BCA", skills: ["Figma", "Research"], employmentTypes: ["Internship"] },
  createdAt: now
}}, { upsert: true });

const employer = d.users.findOne({ email: "employer@example.com" });
d.jobs.updateOne({ title: "Product Design Intern", employerId: employer._id }, { $setOnInsert: {
  employerId: employer._id, title: "Product Design Intern", companyName: "Northstar Labs",
  location: "Ahmedabad, Gujarat", industry: "Technology", employmentType: "Internship",
  salaryMin: 12000, salaryMax: 18000, currency: "INR",
  description: "Support product research, wireframes and prototyping.",
  requirements: ["Figma", "Communication", "User research"], status: "published",
  createdAt: now
}}, { upsert: true });
print("Sample JobConnect documents inserted.");
