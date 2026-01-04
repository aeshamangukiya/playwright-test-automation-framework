@echo off
echo Running REGRESSION tests...

call npm run clean:allure
call npx playwright test --grep @regression

pause
