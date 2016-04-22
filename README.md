## Lesson Plan Management System
This application was developed for Bet Shalom Congregation as part of a group project at Prime Digital Academy. From
requirements gathering through deployment this project was completed in three weeks by students:

Remy Allen:  https://github.com/remyallen

Bennett Batzli:  https://github.com/BennettBatzli

Savio Nguyen:  https://github.com/savionguyen

John Rachuy:  https://github.com/johnrachuy

Josh Sternberg:  https://github.com/JoshuaSternberg

##Who Bet Shalom Congregation is and how they are using this application
Bet Shalom Congregation is a Reform Jewish congregation located in Minnetonka, Minnesota. Their religious school is
committed to working together with all families to create a safe and positive environment for children to learn and
grow in their Jewish faith. The Bet Shalom Religious School meets twice a week; Sunday morning and Wednesday evening.
The teachers work full-time outside of school and volunteer their time as a way to give back to the community. This
application allows admins and teachers to create lesson plans and share them with each other. This will save time
for everyone by allowing them spend more time teaching rather than building brand new lesson plans every
week.

##How this applications works
Here is a quick walk through with some screen shots to give you a better idea of how everything works.

##Login Page
This is the login page. The user enters their email address and password to gain access to the site. If they can't
remember their password they can easily request a password reset by pressing the forgot password button. The user is
sent an email to verify their identity and directed to a page to set a new password and login.
![Home View](/public/images/bet_shalom_login.png?raw=true "Optional Title")

##Admin Dashboard
This is the homepage for anyone logging in with admin credentials. Upon logging in the admin is greeted with a list of
lesson plans that have been submitted for approval. All lesson plans created must be approved by an admin before they
are searchable by other users.
![Home View](/public/images/bet_shalom_admin_dashboard.png?raw=true "Optional Title")

##Create Lesson Plan
When a user goes to the Create Lesson Plan page this is what they will see. The first thing is to select if this will
be a lesson plan or a resource. The ability to add resources is an admin only feature and will only appear if an admin
is logged in. There is a field to enter a lesson title, the author is automatically populated based on the logged in
user, a dynamic typahead of different searchable tags, a materials field to put any required items needed to do this
particular lesson, a large text area for the plan itself and a choose file button to upload files/images into the
lesson plan.

![Home View](/public/images/bet_shalom_lesson_with_content.png?raw=true "Optional Title")
The admin has the ability to edit any submitted lessons before publishing. If there's something small they want to
change they can eaisly do this from right here. If there's something more major they can add a comment and send it
back to the teacher as needs review. Upon pressing the publish button a modal pops up to verify the action. Modals are
used throughout the site to give the user feedback on requests.

![Home View](/public/images/bet_shalom_publish_modal.png?raw=true "Optional Title")

##Manage Users
The manage users page is only accessible by users logged in with admin credentials. Here an admin can add new users and
edit existing ones. When a new user is created they are sent and email with a link which will bring them to the site
allowing them to set a password and login.
![Home View](/public/images/bet_shalom_manage_users.png?raw=true "Optional Title")
![Home View](/public/images/bet_shalom_password_reset.png?raw=true "Optional Title")

##Teacher Dashboard
![Home View](/public/images/bet_shalom_teacher_dashboard.png?raw=true "Optional Title")

##Search
![Home View](/public/images/bet_shalom_search.png?raw=true "Optional Title")

##Published Lessons / Favorites / Comments
![Home View](/public/images/bet_shalom_lesson_published.png?raw=true "Optional Title")

##File Upload
![Home View](/public/images/bet_shalom_file_upload.png?raw=true "Optional Title")
![Home View](/public/images/bet_shalom_lesson_photo.png?raw=true "Optional Title")