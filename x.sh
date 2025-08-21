TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiY202MGc3eDR2MDAwODEyNHVsbmg0MDR6bSIsIm5vbW9yIjoiNjI4MTMzOTE1ODkxMSIsInVzZXJuYW1lIjoiQmFnYXNfYmFudW5hIiwiYWN0aXZlIjp0cnVlLCJtYXN0ZXJVc2VyUm9sZUlkIjoiMSJ9LCJpYXQiOjE3NDQwOTQyMjQsImV4cCI6MTk2NDk5NzQyNH0.ByTKFPpcL6oljeizWkUM4Z0jaWzc9oPrkpCCImQY3KE"
URL="https://stg-hipmi.wibudev.com"
# curl -X GET -H "Authorization: Bearer $TOKEN" ${URL}/api/middleware



curl -X GET -H "Cookie: hipmi-key=$TOKEN; user_id=789" ${URL}/dev/home | tee test.html
