# TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiY202MGc3eDR2MDAwODEyNHVsbmg0MDR6bSIsIm5vbW9yIjoiNjI4MTMzOTE1ODkxMSIsInVzZXJuYW1lIjoiQmFnYXNfYmFudW5hIiwiYWN0aXZlIjp0cnVlLCJtYXN0ZXJVc2VyUm9sZUlkIjoiMSJ9LCJpYXQiOjE3NDQwOTQyMjQsImV4cCI6MTk2NDk5NzQyNH0.ByTKFPpcL6oljeizWkUM4Z0jaWzc9oPrkpCCImQY3KE"
URL="http://localhost:3000"
# curl -X GET -H "Authorization: Bearer $TOKEN" ${URL}/api/middleware
# curl -X GET -H "Cookie: hipmi-key=$TOKEN; user_id=789" ${URL}/dev/home | tee test.html

curl -X POST ${URL}/api/mobile/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "fcmToken": "cVmHm-3P4E-1vjt6AA9kSF:APA91bHTkHjGTLxrFsb6Le6bZmzboZhwMGYXU4p0FP9yEeXixLDXNKS4F5vLuZV3sRgSnjjQsPpLOgstVLHJB8VJTObctKLdN-CxAp4dnP7Jbc_mH53jWvs",
    "title": "Test dari Backend (App Router)!",
    "body": "Berhasil di App Router!"
  }'