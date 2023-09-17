Test project created with  Serverless Boilerplate with Serverless Framework 3, ExpressJS, TypeScript, Prisma and MongoDB 

## Security
I'm assuming that under production load, we would store all our users in a database or some other storage, and we'd only be able to submit superhero scores if we have a login detail.

The provided solution does not implement any of these, but I'll provide some ideas on how we could implement it. The current implementation is only for demo purposes but it is blocking the implementation of any of the security features.

### API GW
Using a custom authorizer we could implement a validation and authorization. This could either be any kind of auth... even a basic auth would do it. 
We'd need to store the users in a database, and validate the credentials against it. 

### Cognito
We could use cognito, to get the users and validate the credentials against it. Using JWT tokens, we could validate the token and get the user information from it.

### Custom code
We could implement some sort of validation mechanism inside the lambda directly, where we would look up the users the same way as we do it with api gw, but then we'd lose out on all the provided features of a custom authorizer. (like caching, etc.)

## Traffic management
If we have a large influx of users, the lambda would not really have an issue with the increased demand as long as we have enough concurrent executions.
Our database would be the bottleneck, so we'd need to scale that up or come up with some different solutions how we can handle the load:
* scale the database (have multiple read replicas)
* use a key-value store to store user credentials (even an S3 could work, as its speed it won't be an issue)
* We could have an ingest endpoint where we could accept all the requests, and then use a queue to process them in the background. If later it turns out that the user had no right to post we'll not process the request. This way we could scale the processing of the requests independently from the actual requests. (in this case we would have the issue, of how do we notify the user, that the request was not processed, but we could use a queue for that as well, and then have a separate lambda to process the notifications)

## Logging, monitoring and alerting
Implementing a good logger library and standardising the logs would be a good start. We could use a library like winston, and then send the logs to cloudwatch.

We could use cloudwatch to monitor the aws services and set up alarms for when the lambda is not working properly.

We could also use a service like grafana to monitor the lambda and the database as well. This way we could spot trends before they become an issue. 
The alerting could happen through various channels depending on the flavour of data monitoring we use. Then these could be sent (depending on the severity) to slack, email, or even a 3rd party service like pagerduty/alertops.

