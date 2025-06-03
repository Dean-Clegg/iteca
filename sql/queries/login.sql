SELECT *
FROM almsafpa_eduvosprojd.users
WHERE email = :email
  AND password = :password;