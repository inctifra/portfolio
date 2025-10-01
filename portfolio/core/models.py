from django.db import models


class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon = models.ImageField(upload_to="tech/", blank=True, null=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    slug = models.SlugField(unique=True)
    thumbnail = models.ImageField(upload_to="projects/")
    repo_url = models.URLField(blank=True)
    live_demo_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    technologies = models.ManyToManyField(Technology, related_name="projects")

    def __str__(self):
        return self.title


class Experience(models.Model):
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.company


class Education(models.Model):
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    start_year = models.DateField()
    end_year = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.institution


class SkillCategory(models.Model):
    name = models.CharField(max_length=100)  # e.g., "Frontend", "Backend", "DevOps"

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(
        SkillCategory, on_delete=models.CASCADE, related_name="skills",
    )
    name = models.CharField(max_length=100)
    proficiency = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    cover_image = models.ImageField(upload_to="blog/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class BlogTag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    posts = models.ManyToManyField(BlogPost, related_name="tags")

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    author_name = models.CharField(max_length=255)
    author_role = models.CharField(max_length=255)
    author_company = models.CharField(max_length=255)
    feedback = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author_name


class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    responded = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class VisitorLog(models.Model):
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    visited_at = models.DateTimeField(auto_now_add=True)
    page_url = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address} > {self.user_agent}"
