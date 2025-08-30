# Contact API Spec

## Create Contact API

Endpoint: POST api/contacts

Headers:

- Authorization : token

Request Body:

```json
{
  "first_name": "Hamam",
  "last_name": "Priyatmoko",
  "email": "hamam@gmail.com",
  "phone": "124241"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Hamam",
    "last_name": "Priyatmoko",
    "email": "hamam@gmail.com",
    "phone": "124241"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint: POST api/contacts

Headers:

- Authorization : token

Request Body:

```json
{
  "first_name": "Eko",
  "last_name": "Khannedy",
  "email": "eko@pzn.com",
  "phone": "32423423434"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Eko",
    "last_name": "Khannedy",
    "email": "eko@pzn.com",
    "phone": "32423423434"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint: POST api/contacts

Headers:

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Eko",
    "last_name": "Khannedy",
    "email": "eko@pzn.com",
    "phone": "32423423434"
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint: POST api/contacts

Headers:

- Authorization : token

Request Body:
Response Body Success:
Response Body Error:

## Delete Contact API

Endpoint: POST api/contacts

Headers:

- Authorization : token

Request Body:
Response Body Success:
Response Body Error:

````

```

```
````
