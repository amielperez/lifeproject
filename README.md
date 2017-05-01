## LifeProject
This is a demo project where I applied what I have learned studying AngularJS so far.

### Requirements
1. node
2. npm

### Installation
Since this is still a work-in-progress, the current installation process requires some manual steps:

1. Clone this repo, then `cd` to the root directory
2. Run `npm install` to install dependencies
3. Edit `./env.js` and change the value for `apiUrl` to where your backend is deployed (more on the backend later)
    ```javascript
    ((window) => {
      window.__env = window.__env || {}
      window.__env.apiUrl = 'http://localhost:3000' // <-- Change me!
    })(this);
    ```
4. Run `npm start`. This will run an embedded server on port `5000`.
5. If for some reason you need the port changed, go to `./gulpfile.js` then change this line:
    ```javascript
    var embedlr = require('gulp-embedlr'),
      express = require('express');
      serverPort = 5000; // <-- This one
      path = require('path');
    ```
    
### Backend Configuration

If you know Rails, you can check out another [repository](https://github.com/amielperez/lifeproject-api) that I wrote that is immediately compatible with this project

#### Creating your own backend
If you want to create your own backend, that's also all right, as long as the backend has the following endpoints:

```
GET /projects
```
Returns all projects as an array of JSON object, each object containing the following keys:
```javascript
{
  id: integer, // Unique id for the record
  name: string, // Project name
  statuses: [ // array of status objects representing the possible statuses in the project, e.g, To-do, In Progress, Done
    {
      id: integer, // Unique id for the status
      name: string // Name of the status, e.g., To-do
    }
  ],
  starting_status: {}, // Starting status of the project, e.g., To-do. This is a status object similar to the above.
  ending_status: {} // Ending status of the project, e.g., Done. This is a status object similar to the above.
}
```

```
POST /projects
```

Accepts a JSON object representing the project you want to create. The only accepted key for now is `name` (see the structure above)

```
GET /tasks?project_id=id
```

Returns all tasks of a given project identified by the `project_id` query param. This is an array of JSON objects with the following keys:

```javascript
{
  id: integer, // Unique id
  summary: string, // Summary
  description: string, // Description
  status_id: integer, // id of the status this task is in. This must match the `statuses` property of the project (see above)
  status_name: string, // name of the status this task is in. This must match the `statuses` property of the project (see above)
  project_id: project_id // project id. This must match the `id` property of the project this task belongs to
}
```

```
POST /tasks
```

Create a task for the project. Accepts the following keys

```javascript
{
  summary: string,
  description: string,
  project_id: string
}
```

```
PUT /tasks
```
Updates a task. This is also the same endpoint used to 'delete' a task. It assumes that a task is only soft-deleted, meaning flagged as deleted in the database (so that the corresponding `GET` filters these soft-deleted tasks out). If you want your backend to hard-delete, that is fine as well, but this app will not use the `DELETE` verb for that.

Accepted params:

```javascript
{
  status_id: integer, // The id of the new status for this task. Must match the statuses in the project.
  deleted: true // This will cause the backend to delete this task from the project.
}
```

### References
https://github.com/mgechev/angularjs-style-guide
