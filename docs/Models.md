# Newcomers Docs

## Models

- Admin

  ```
  {
    username : String,
    password : String
  }
  ```

---

Course

title
price
Instructors[]
totalSeconds
courseRatings:
[
{
rating : int
review : string
trainee : ref
}
]
short summary
subtitle
preview vid
[vids]
[exercises]
discount
[reports]
[Students]

---

Instructor

Username : String
Password : String
Email : String
Minibiography : String
Country : String
Courses: [references]
Ratings:
[
{
Rating: Int,
Review: String,
Trainee: Ref
}
]

---

Corperate Trainee

username : string,
password : string,
email : string,
country : string,
corperate : ref,
courses:
[
{
course_id : ref,
exercises:
[
{
exercise_id : ref,
grade : number
}
]
}
]

---

Individual Trainee

Username
Password
Email
Country
[
{
Course id,
[
{
Exercise id,
Grade
}
]
}
]
