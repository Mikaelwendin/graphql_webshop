const url = "http://localhost:5000/graphql";

const graphQlQuery = async (url, query, variables = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const res = await response.json();
  return res.data;
};

document.getElementById("btn").addEventListener("click", async () => {
  const getAllGrudges = `query GetAllGrudges {
    getAllGrudges {
      description
      id
      name
    }
  }`;
  let data = await graphQlQuery(url, getAllGrudges);
  //console.log(data);
  createHtml(data.getAllGrudges);
});
const createHtml = (data) => {
  const container = document.body;

  data.forEach((val) => {
    const grudgeContainer = document.createElement("div");
    const topic = document.createElement("h2");
    const desc = document.createElement("p");
    topic.innerHTML = val.name;
    desc.innerHTML = val.description;
    grudgeContainer.addEventListener("click", () => {
        handleClick(val.id);
    })
    container.appendChild(grudgeContainer);
    grudgeContainer.appendChild(topic);
    grudgeContainer.appendChild(desc);
  });
};
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
  const createGrudgeQuery = `mutation CreateGrudge($name: String!, $description: String) {
        createGrudge(name: $name, description: $description) {
            id
            name
            description
 }
    }`;
    const input = {
        name: document.getElementById("textOne").value,
        description: document.getElementById("textTwo").value,
    };
    const response = await graphQlQuery(url, createGrudgeQuery, input )
    console.log(response);
});

const handleClick = (arg) => {
    console.log("you clicked " + arg);
}
