@echo off
echo Running SMOKE tests...

call npm run clean:allure
call npx playwright test --grep @smoke

pause
