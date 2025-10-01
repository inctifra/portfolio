from django.contrib import admin

from .models import BlogPost
from .models import BlogTag
from .models import ContactMessage
from .models import Education
from .models import Experience
from .models import Project
from .models import Skill
from .models import SkillCategory
from .models import Technology
from .models import Testimonial
from .models import VisitorLog


# ----------------- Technology -----------------
@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ("name", "icon")
    search_fields = ("name",)
    ordering = ("name",)


# ----------------- Project -----------------
class ProjectTechnologyInline(admin.TabularInline):
    model = Project.technologies.through
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "featured", "created_at")
    list_filter = ("featured", "technologies")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectTechnologyInline]
    exclude = ("technologies",)
    ordering = ("-created_at",)


# ----------------- Experience -----------------
@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("company", "role", "start_date", "end_date")
    search_fields = ("company", "role", "description")
    list_filter = ("start_date", "end_date")
    ordering = ("-start_date",)


# ----------------- Education -----------------
@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("institution", "degree", "field_of_study", "start_year", "end_year")
    search_fields = ("institution", "degree", "field_of_study")
    list_filter = ("start_year", "end_year")
    ordering = ("-start_year",)


# ----------------- SkillCategory -----------------
@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


# ----------------- Skill -----------------
@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency")
    list_filter = ("category", "proficiency")
    search_fields = ("name", "category__name")
    ordering = ("category", "name")


# ----------------- BlogTag -----------------
@admin.register(BlogTag)
class BlogTagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


# ----------------- BlogPost -----------------
@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}
    # filter_horizontal = ("tags",)
    ordering = ("-created_at",)


# ----------------- Testimonial -----------------
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("author_name", "author_role", "author_company", "created_at")
    search_fields = ("author_name", "author_role", "author_company", "feedback")
    list_filter = ("created_at",)
    ordering = ("-created_at",)


# ----------------- ContactMessage -----------------
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "responded", "created_at")
    search_fields = ("name", "email", "subject", "message")
    list_filter = ("responded", "created_at")
    ordering = ("-created_at",)
    actions = ["mark_as_responded"]

    def mark_as_responded(self, request, queryset):
        updated = queryset.update(responded=True)
        self.message_user(request, f"{updated} message(s) marked as responded")

    mark_as_responded.short_description = "Mark selected messages as responded"


# ----------------- VisitorLog -----------------
@admin.register(VisitorLog)
class VisitorLogAdmin(admin.ModelAdmin):
    list_display = ("ip_address", "user_agent", "visited_at", "page_url")
    search_fields = ("ip_address", "user_agent", "page_url")
    list_filter = ("visited_at",)
    ordering = ("-visited_at",)
