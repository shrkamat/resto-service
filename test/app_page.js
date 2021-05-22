// global.fetch = require("node-fetch");

const fetch = require("node-fetch");

/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://resto-service-2021.hasura.app/v1/graphql",
    {
      method: "POST",
      headers: {'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'vb10SMBDZIJOicIXDdccLLXNCnor6u7j1nDAd87fBQxeWLigPRrhulj7h0PaNCUQ'
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

const operationsDoc = `
  query AppPage {
    Restaurant(where: {id: {_eq: 1}}) {
      name
    }
    Classification(where: {name: {_in: ["Steak", "Soup", "Desserts"]}}) {
      name
      MenuItems(where: {restaurant_id: {_eq: 1}}) {
        name
        img
        price
        is_veg
      }
    }
  }
`;

function fetchAppPage() {
  return fetchGraphQL(
    operationsDoc,
    "AppPage",
    {}
  );
}

async function startFetchAppPage() {
  const { errors, data } = await fetchAppPage();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(JSON.stringify(data, undefined, 2));
}

startFetchAppPage();
