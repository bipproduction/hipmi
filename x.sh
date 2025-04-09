TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiY20wYWUzcmw2MDAwMWZzNWowN3ZtdjRvaCIsIm5vbW9yIjoiNjI4MjM0MDM3NDQxMiIsInVzZXJuYW1lIjoiYmFnYXNfYWRtaW4iLCJhY3RpdmUiOnRydWUsIm1hc3RlclVzZXJSb2xlSWQiOiIzIn0sImlhdCI6MTc0Mjk2OTc1OSwiZXhwIjoxOTYzODcyOTU5fQ.4bFEdhm4TeysoDcC1D54PPbyJPHSMBisiEn5GXoYr30"
# curl -X GET -H "Authorization: Bearer $TOKEN" https://localhost:3000/api/middleware

curl -X GET -H "Cookie: hipmi-key=$TOKEN; user_id=789" https://localhost:3000/api/middleware

