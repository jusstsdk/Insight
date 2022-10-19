# Newcomers Docs
## Models
- Admin

  ```
  {
    username : String,
    password : String
  }
  ```
  
## API
### Administrator Endpoints
- GET all administrators

  - verb: GET
  
  - route : `/api/administrators/`
  
  - response : array of all administrators
  
- GET a single administrator

  - verb: GET
  
  - route : `/api/administrators/id`
  
  - response : single administrator
  
- Create an administrator

  - verb: POST
  
  - route : `/api/administrators/`
  
  - response : newly created admin
  
- Update an administrator

  - verb: PUT
  
  - route : `/api/administrators/id`
  
  - response : newly updated admin
  
- Delete an administrator

  - verb: DELETE
  
  - route : `/api/administrators/id`
  
  - response : deleted adming
