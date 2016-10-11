# Email Service 

## This is a free email service provided to users.
* Its developed using Mongo, Express, Angular, Node.js(MEAN) stack using mail servers from Mailgun and Sendgrid.
* This service successfully abstracts email servers behind it, 
* It balances request using factors such as sticky sessions along with failover mechanism.
* Failover mechanism does not cause service to fail even if one mail server goes down.
* It automatically chooses another mail server running. Servers can be added to the pool at runtime.
* Its still in beta mode. Changes are being made.