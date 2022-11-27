# To-Do

1. Edit Model
   - [ ] remove required
   - [ ] change reviewer and reporter to author

1. login
   - [ ] authentication
   - [ ] session
   - [ ] sign up etc

1. select country
   - [ ] view local price
   - [ ] update user country

1. validations
   - [ ] provided information is correct
   - [ ] force specific query params

1. search courses
   - [x] filter
   - [ ] sort
   - [x] search

1. trainee controller
   - CRUD
   
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
   - [ ] add vids
   - [ ] ~~edit details~~
   - [ ] ~~handle adding / removing other instructors~~
   - [ ] add discount (insturctor or admin)
  
1. exams & exercises & course model - Wael
   - [x] make an exercise model for MCQ
   - [ ] instrutctor create exercise / exam in course model
   - [x] add hours to subtitles in course model
   - [x] add solutions
   - [ ] student solve an exercise / exam
   - [ ] save the grade
   - [ ] save the progress
  
1. ratings and reviews - Mahmoud
   - [ ] rate an instructor / course
   - [ ] view these reviews

1.  reports controller - Yousef
    - [ ] can report a course
    - [ ] can follow up on a report
    - [ ] can handle a report
  
1. refunds
   - [ ] request if below 50%
   - [ ] handle refund
   
1. Error Handling
    
1. Certificate
   - [ ] "post save" hook to check if 100% progress send email with certificate
   - [ ] generate personalized certificate

# Questions
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
