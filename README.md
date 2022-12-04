# To-Do

1. Edit Model
   - [ ] remove required
   - [x] change reviewer and reporter to author
   - [x] hash passwords

1. Email
   - [ ] receive an email to change a forgotten password
   - [ ] receive a certificate as a PDF after completing the course via email

1. login
   - [x] authentication
   - [x] session
   - [x] sign up etc
   - [ ] add authentication to all routes
   - [ ] username is unique across all documents? right now, if 2 users share same username one of them will always get a wrong password response because you check in all three tables in order

1. country
   - [ ] select country
   - [ ] get country from JWT then use post find hook to display local prices
   - [ ] update user country

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
   - [ ] ~~edit details~~
   - [ ] ~~handle adding / removing other instructors~~
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

# Questions
   - act as if we called pay API is good enough?
   - What are subtitles
   - How to calculate progress
   - JWT vs Sessions
   - How do we calculate popularity
   - "see all previously reported problems and their statuses" vs "follow up on an unresolved problem"
   

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
