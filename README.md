# service-badges

This is a microservice based application that allows tech conference organizers to effectively manage their conferences. There are nine different Bounded Contexts; each should manifest itself as a microservice with the specified APIs that allow for a graphical human interface and inter-microservice communication.

# How To Get Started

npm install

# Scripts To Run For Consumers

## Presentations

yarn presentations

## Vendors

yarn vendors

## Attendees

yarn attendees

## Sponsors

yarn sponsors

# Routes

GET /badges

Returns all the badges created in a json object that looks like this:

{
"id": 1,
"name": "Mark Nichols",
"label": "Speaker",
"company": "MN Inc."
}

## Requirements

The Badges Bounded Context is responsible for generating badges for people that will show up at the conference. Each badge must have a unique identifier that can be represented as a Micro QR code.

The Badges Bounded Context is responsible for generating badges for people that will show up at the conference. Each badge must have a unique identifier that can be represented as a Micro QR code. If the person is a speaker, then the badge should be labeled "Speaker", have their name, their company, and the identifier. If the person represents a vendor, it should be labeled "Vendor" and have the identifier. If the person is part of the sponsorship team, it should be labeled with their level of sponsorship, have the their name, company, and the identifier.

If a person could potentially have more than one badge, i.e. is part of a sponsorship team and a speaker, only one badge should be generated for them. If this occurs, then the label on it should be, in descending order or importance, "Sponsor", "Vendor", "Speaker".

\*Depends on: Attendees, Presentations, Sponsors, and Vendors
This must provide HTTP RESTful APIs to achieve the following:
Report a list of entries that contain the unique identifiers, badge labels, names (if applicable), and company names so that badges can be printed.

### Depends on: Attendees, Presentations, Sponsors, and Vendors

This must provide HTTP RESTful APIs to achieve the following:
Report a list of entries that contain the unique identifiers, badge labels, names (if applicable), and company names so that badges can be printed.
