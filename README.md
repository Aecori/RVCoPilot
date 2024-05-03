**BACKEND API GUIDE**

**Sites**

**Get All Sites** <br>
Allows you to get information about all sites. <br>
GET /sites <br>
Request <br>
Path Parameters: None <br>
Request Body: None <br>
Request Body Format: JSON <br>
Request Header: <br>
Header | Required Value | Optional Value | Notes
--- | --- | --- | ---
Accept | application/json | N/A | Request will fail without the required value

Response Statuses:
Outcome | Status Code | Notes
--- | --- | ---
Success | 200 OK | 
Failure | 406 Not Acceptable | Invalid header, headers besides application/JSON will be denied.

**Get a Site** <br>
Allows you to get information about a specific site. <br>
GET /sites/:id <br>
Request <br>
Path Parameters: id <br>
Request Body: None <br>
Request Body Format: JSON <br>
Request Header: <br>
Header | Required Value | Optional Value | Notes
--- | --- | --- | ---
Accept | application/json | N/A | Request will fail without the required value

Response Statuses:
Outcome | Status Code | Notes
--- | --- | ---
Success | 200 OK | 
Failure | 404 Not Found | Site not found

**Get Sites within 50 miles of a given point** <br>
Allows you to get information about all sites within 50 miles of a given point. <br>
GET /sites/latitude/:latitude/longitude/:longitude <br>
Request <br>
Path Parameters: latitude, longitude <br>
Request Body: None <br>
Request Body Format: JSON <br>
Request Header: <br>
Header | Required Value | Optional Value | Notes
--- | --- | --- | ---
Accept | application/json | N/A | Request will fail without the required value

Response Statuses:
Outcome | Status Code | Notes
--- | --- | ---
Success | 200 OK | 
Failure | 400 Bad Request | Latitude and longitude formatting error

**Post a Site** <br>
Allows you to create a new site. <br>
POST /sites <br>
Request <br>
Path Parameters: None <br>
Request Body: Site data <br>
Request Body Format: JSON <br>
Request Header: <br>
Header | Required Value | Optional Value | Notes
--- | --- | --- | ---
Accept | application/json | N/A | Request will fail without the required value

Response Statuses:
Outcome | Status Code | Notes
--- | --- | ---
Success | 201 Created | 
Failure | 400 Bad Request | Invalid site data

**Post a Comment** <br>
Allows you to post a comment on a site. <br>
POST /sites/:id/comments <br>
Request <br>
Path Parameters: id <br>
Request Body: Comment data <br>
Request Body Format: JSON <br>
Request Header: <br>
Header | Required Value | Optional Value | Notes
--- | --- | --- | ---
Accept | application/json | N/A | Request will fail without the required value

Response Statuses:
Outcome | Status Code | Notes
--- | --- | ---
Success | 200 OK | 
Failure | 404 Not Found | Site not found
Failure | 400 Bad Request | Invalid comment data

**Update a Site** <br>
Allows you to update a site. <br>
PATCH /sites/:id <br>
Request <br>
Path Parameters: id <br>
Request Body: Updated site data <br>
Request Body Format: JSON <br>
Request Header: <br>
Header | Required Value | Optional Value | Notes
--- | --- | --- | ---
Accept | application/json | N/A | Request will fail without the required value

Response Statuses:
Outcome | Status Code | Notes
--- | --- | ---
Success | 200 OK | 
Failure | 404 Not Found | Site not found
Failure | 400 Bad Request | Invalid site data

**Delete a Site** <br>
Allows you to delete a site. <br>
DELETE /sites/:id <br>
Request <br>
Path Parameters: id <br>
Request Body: None <br>
Request Body Format: JSON <br>
Request Header: <br>
Header | Required Value | Optional Value | Notes
--- | --- | --- | ---
Accept | application/json | N/A | Request will fail without the required value

Response Statuses:
Outcome | Status Code | Notes
--- | --- | ---
Success | 204 No Content | 
Failure | 404 Not Found | Site not found
