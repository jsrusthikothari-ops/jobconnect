<?php $pageTitle = $pageTitle ?? 'JobConnect'; $user = current_user(); ?>
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($pageTitle) ?> · JobConnect</title><link rel="stylesheet" href="assets/styles.css">
</head><body>
<header class="topbar"><a class="brand" href="index.php"><span class="brand-icon">J</span> JobConnect</a>
<nav class="nav-links">
<a href="jobs.php">Find jobs</a><a href="candidates.php">Find talent</a>
<?php if ($user): ?><a href="dashboard.php">Dashboard</a><a href="applications.php">Applications</a><a class="nav-cta" href="post-job.php">Post a job</a><a href="logout.php">Log out</a>
<?php else: ?><a href="login.php">Log in</a><a class="nav-cta" href="onboarding.php">Get started</a><?php endif; ?>
</nav><button class="menu-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')" aria-label="Toggle menu">☰</button>
</header><main>
