# Video with a quick overview:
[Quick description](https://drive.google.com/file/d/1WiOIx_Vk79S_PJ4xX18dWlPnp6yvJaFA/view?usp=sharing)

# How to install and run it?

- The first step is to clone the project or download it directly from this repo.
- Install all the dependencies using the following command.

```bash
npm install
```

- I used a JSON server to mock the endpoint for retrieving the data so, You need to install it separately:

```bash
npm install  json-server
```

- A small note: I had to change the port of the JSON server (3001) because it was the same as the one used for my local development server.
- Run the following command to build you json server.

```bash
json-server --config json-server.json db.json
```

- Finally, start the front-end server using the following command:

```bash
npm start
```
