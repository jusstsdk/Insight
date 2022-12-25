# Critical Tasks
1. show correct currency in all searches and discount
1. pagination
1. discount should take date into consideration in backend
1. use more notifications
1. add confirmation to critical actions
1. create course input currency to USD
1. show total hours of course in search
1. request access should have corporate name
1. fix subject filter to use existing subjects
1. comment on unresolved problems (1 array and save who (username to avoid populate maybe) said what for order's sake)
1. add free price
1. view course but not open
1. first login after sign up (agree to terms & fill your other details & change password only first time)
1. change password without forgetting
1. view course details (everything including popularity i.e. number of students)
1. view subtitles (including vids, exercises and exam)
1. solve exercise / exam & view grade (correct & chosen answer)
1. watch vid
1. discount date
1. rate course
1. rate instructor
1. accept terms as anyone (including normal trainee at sign up)
1. most popular course (number of enrolled students, handled at pay, request access and refund)
1. preview vid
1. feedback that discount already exists
1. request courses on main page
1. Q. What does "follow up" mean? 
   A. It means an instructor or trainee that previously reported an issue can view this issue and write a comment if the admin had never responded to it.
1. Q. What should the certificate look like?
   A. You can have 1 PDF that is sent to all trainees regardless of the course. You do not need to add their names nor the course name to the certificates. The course name only needs to be in the subject of the email.

# Optional Tasks
- google analytics
- add subtitle description
- remove hours input create course

# To-Do

1. Edit Model
   - [ ] remove required
   - [x] change reviewer and reporter to author
   - [x] hash passwords
   - [ ] add rating to instructor model
   - [ ] first and last name
   - [ ] remove discount after a while as instructor
   - [ ] add discount as admin
   - [ ] add notes to videos
   - [x] add currency to my courses (maybe update trainee model)
   - [x] refresh user in local storage

1. Email
   - [x] receive an email to change a forgotten password
   - [ ] receive a certificate as a PDF after completing the course via email

1. login
   - [x] authentication
   - [x] session
   - [x] sign up etc
   - [ ] add authentication to all routes
   - [x] refreshing should keep me in the same page

1. country
   - [x] select country
   - ~~[x] get country from JWT then use post find hook to display local prices~~
   - [x] update user country

1. validations
   - [ ] provided information is correct
   - [ ] force specific query params

1. search courses
   - [x] filter
   - [ ] sort
   - [x] search

1. trainee controller
   - [x] CRUD
   
1. update trainee model - Wagdy
   - [ ] add payment
   - [ ] pay for course
   - [ ] discount logic
   - [ ] add notes to student model while watching vid
   - [ ] wallet money
 
1. course access - Aamena
   - [ ] request course access
   - [ ] view & grant course access
 
1. instructor put course
   - [x] add a video per subtitle
   - [ ] change video format to embedded format
   - [x] add description of the video
   - ~~[ ] edit details~~
   - ~~[ ] handle adding / removing other instructors~~
   - [ ] add discount (insturctor or admin)
  
1. exams & exercises & course model - Wael
   - [x] make an exercise model for MCQ
   - [x] instrutctor create exercise / exam in course model
   - [x] add hours to subtitles in course model
   - [x] add solutions
   - [ ] student solve an exercise / exam
   - [x] save the grade
   - [x] save the progress
  
1. ratings and reviews - Mahmoud
   - [x] rate an instructor / course
   - [x] view these reviews

1.  reports controller - Yousef
    - [x] can report a course
    - [x] can follow up on a report
    - [x] can handle a report
  
1. refunds
   - [x] request if below 50%
   - [x] handle refund
   
1. Error Handling
    
1. Certificate
   - [ ] "post save" hook to check if 100% progress send email with certificate
   - [ ] generate personalized certificate

- [ ] standard pool of subjects
- [ ] start and end of promotion 

# New questions
   - subtitle times and progress, can it just be entered by the instructor because he can judge how much time exercises take.

# Questions
   - money owed per month instructor?
   - accept conditions when? // First Login
   - what does the certificate look like? how to create one?
   - most viewed course vs most popular vs just most reviewed
   - act as if we called pay API is good enough? // Stripe API
   - view but not open course?
   - who will add the rest of details (admin/instrut/corp) // First Login
   - first last names for the other models?
   - What are subtitles
   - How to calculate progress? do we need to keep track of watched video time as well?
   - handle refresh logic?
   - How do we calculate popularity
   - responsiveness
   - 1 exam for all course or 1 per subtitle (if later, then what difference is it from an exercise?)
   - sending emails to reset passwords and other emails not needed? // Needed
   - What is "follow up on an unresolved problem"?
   - username is unique across all documents? right now, if 2 users share same username one of them will always get a wrong password response because you check in all three tables in order

# Bugs

# Answered
   - How to handle editing exercises?
      don't
   - Editing instructors
      no editing
   - What do we do with the country
      local pricing
   - Should we handle 3rd party accessing the API
      No, only frontend sends requests
