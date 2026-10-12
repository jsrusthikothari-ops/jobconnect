<?php
// Demo configuration. Set these environment variables before connecting to MongoDB.
define('MONGODB_URI', getenv('MONGODB_URI') ?: 'mongodb://127.0.0.1:27017');
define('MONGODB_DATABASE', getenv('MONGODB_DATABASE') ?: 'jobconnect');
if (session_status() === PHP_SESSION_NONE) session_start();

function current_user(): ?array { return $_SESSION['user'] ?? null; }
function require_login(): void {
    if (!current_user()) { header('Location: login.php'); exit; }
}
function e($value): string { return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'); }
function demo_jobs(): array {
    return [
        ['id'=>'j1','title'=>'Product Design Intern','company'=>'Northstar Labs','location'=>'Ahmedabad, Gujarat','type'=>'Internship','salary'=>'₹12,000–18,000 / month','industry'=>'Technology','tags'=>['Figma','UI/UX','Research'],'description'=>'Work with product and engineering teams to improve user journeys and prototype new features.'],
        ['id'=>'j2','title'=>'Junior Business Analyst','company'=>'BlueOrbit Tech','location'=>'Hybrid · Ahmedabad','type'=>'Full-time','salary'=>'₹3.5–5 LPA','industry'=>'Technology','tags'=>['Excel','SQL','Requirements'],'description'=>'Help teams understand business needs, document requirements and turn data into useful insights.'],
        ['id'=>'j3','title'=>'Digital Marketing Associate','company'=>'Mint & Maple','location'=>'Remote · India','type'=>'Full-time','salary'=>'₹2.8–4 LPA','industry'=>'Marketing','tags'=>['Content','SEO','Canva'],'description'=>'Plan campaigns, create content and track engagement across digital channels.'],
        ['id'=>'j4','title'=>'PHP Developer Trainee','company'=>'CodeCove Systems','location'=>'Gandhinagar, Gujarat','type'=>'Trainee','salary'=>'₹15,000–22,000 / month','industry'=>'Technology','tags'=>['PHP','MongoDB','Git'],'description'=>'Build and maintain web application features with mentorship from experienced developers.'],
    ];
}
function demo_candidates(): array {
    return [
        ['name'=>'Aarav Mehta','role'=>'UI/UX Designer','location'=>'Ahmedabad','experience'=>'1 year','skills'=>['Figma','Wireframes','Prototyping'],'initials'=>'AM'],
        ['name'=>'Diya Shah','role'=>'Business Analyst','location'=>'Gandhinagar','experience'=>'Fresher','skills'=>['Excel','SQL','Documentation'],'initials'=>'DS'],
        ['name'=>'Kabir Patel','role'=>'PHP Developer','location'=>'Ahmedabad','experience'=>'2 years','skills'=>['PHP','MongoDB','REST APIs'],'initials'=>'KP'],
    ];
}
