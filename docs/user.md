# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "HamamP",
  "password": "rahasia",
  "name": "Hamam Priyatmoko"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "HamamP",
    "name": "Hamam Priyatmoko"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User Api

Endpoint : POST api/users/login

Request Body :

```json
{
  "username": "HamamP",
  "password": "rahasia"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error:

```json
{
  "errors": "Username or Password wrong"
}
```

## Update User Api

Endpoint : PATCH api/users/current // Jika data yang di update adalah parsial maka gunakan patch

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Hamam Priyatmoko lagi", // optional
  "password": "new password" // optional
}
```

Response Body Success:

```json
{
  "data": {
    "username": "HamamP",
    "name": "Hamam Priyatmoko"
  }
}
```

Response Body Error:

```json
{
  "errors": "Name length max 100"
}
```

## Get User Api

Endpoint : GET api/users/current

Headers:

- Authorization: token

Response Body Success:

```json
{
  "data": {
    "username": "HamamP",
    "name": "Hamam Priyatmoko"
  }
}
```

Response Body Error:

```json
{
  "errors": "Unauthorized"
}
```

## Logout User Api

Endpoint: DELETE api/users/logout

Headers:

- Authorization: token

Response Body Success :

```json
{
  "data": "ok"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
