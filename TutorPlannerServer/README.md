## Server of TutorPlanner application

Simple web service application with node, express, prisma and typescript 😎

## Set up steps:

1. Create **.env** file\
   DATABASE_URL = %URL_TO_YOUR_DATABASE%
2. Generate prisma client:\
   **'npx prisma generate'**
3. \*Optional: if database don't have correct schema yet make migration or push new schema:\
   **'npx prisma db migrate dev'** or **'npx prisma db push'**
4. Start application:\
   **'npm run start'**
