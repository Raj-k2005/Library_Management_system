from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
   path("api/admin/login/",admin_login_api),
   path('api/categories/add/',add_category),
   path('api/categories/',list_categories),
   path('api/update_category/<int:id>/',update_category),
   path('api/delete_category/<int:id>/',delete_category),
   
   path('api/authors/add/',add_author),
   path('api/authors/',list_authors),
   path('api/update_author/<int:id>/',update_author),
   path('api/delete_author/<int:id>/',delete_author),

   path('api/books/add/',add_book),
   path('api/books/',list_books),
   path('api/update_book/<int:id>/',update_book),
   path('api/delete_book/<int:id>/',delete_book),
   path('api/change_admin_password/',change_admin_password),
   path('api/user_signup/',user_signup),
   path('api/user_login/',user_login),
   path('api/user_stats/',user_stats),
   path('api/user_books/',user_list_books),
   path('api/user/profile/',user_profile),
   path('api/student/change_password/',user_change_password),
   path('api/admin/students/',list_reg_students),
   path('api/admin/block_students/<int:id>/',block_students),
   path('api/admin/activate_students/<int:id>/',activate_students),
   path('api/user/by-id/',get_student_by_student_id),
   path('api/books/lookup/',lookup_book_for_issue),
   path('api/issue-book/',issue_book),
   path('api/admin/issued-books/',list_issued_books),
   path('api/issued-books/<int:id>/',get_issued_book_details),
   path('api/return_book/<int:id>/',return_book),
   path('api/admin/student-history/<int:student_id>/',student_issue_history),
   path('api/admin/stats/',admin_dashboard_stats),
   path('api/user_issued_books/',user_issued_books),

]