Implement CRUD in Angular using JSON Data for Real Estate CRM Application
Type: Subjective (Manually Scored)
Skill: Angular / JSON
Angular / JSON
Medium
45 min
Real estate agencies depend significantly on customer relationship management (CRM) to handle inquiries, track leads, and nurture relationships. A streamlined CRM aids agents in identifying potential buyers or renters and ensuring timely communication. Your mission is to design a segment of a real estate CRM system using Angular. This system should allow agents to record new leads and provide a dashboard for management to review all the registered leads.
(db.json):
{
  "leads": [
    {
      "leadID": "LEAD001",
      "clientName": "Samuel Jackson",
      "propertyType": "Apartment",
      "interest": "Buying",
      "budget": 250000,
      "contactDate": "2022-07-01",
      "status": "Follow-up"
    },
    {
      "leadID": "LEAD002",
      "clientName": "Megan Fox",
      "propertyType": "Office Space",
      "interest": "Renting",
      "budget": 1500,
      "contactDate": "2022-07-03",
      "status": "In negotiation"
    }
    // ... Additional leads can be added
  ]
}


Task:
Develop an Angular application that:
Furnishes a form for real estate agents to submit new leads, containing fields:
Client's Name
Property Type (e.g., Apartment, Villa, Office Space)
Interest (Buying/Renting)
Budget
Date of Initial Contact
Lead Status (e.g., New, Follow-up, In negotiation, Closed)
Implement validations for each input (e.g., valid date format, budget being a positive number, etc.)
Embeds an interface for agency management to retrieve and display all recorded leads (getAll).


1. src/app/lead-form/lead-form.component.ts
2. src/app/lead-list/lead-list.component.ts
3. src/app/services/lead.service.ts

Notes:

1. Do not change file names, class names , method declarations.
2. Use Test App & Submit option often so you will be guided by test error messages.
3. You do not need to add template files or styles to the application
4. Do not remove entries from db.json

Testing & Submitting your code:

Step 1: Click on the Projects Button.
Step 2: Click on Test & Submit app button to test your code.
Step 3: You will receive a congratulations message upon successful completion of the task.

