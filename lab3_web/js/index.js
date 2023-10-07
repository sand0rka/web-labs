const trolleybusNumberInput = document.getElementById(
  "trolleybus_number_input"
);
const routeNumberInput = document.getElementById("route_number_input");
const capacityInput = document.getElementById("capacity_input");
const maxSpeedInput = document.getElementById("max_speed_input");

const itemsContainer = document.getElementById("trolleybus_container");

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const sortTrolleybuses = document.getElementById("sort_button");
const calculateButton = document.getElementById("calculate_button");
const summaryCapacity = document.getElementById("summary_capacity");

let trolleybuses = [];
let addedTrolleybusNumbers = [];
let showedList = [];
const addItem = ({ trolleybus_number, route_number, capacity, max_speed }) => {
  if (addedTrolleybusNumbers.includes(trolleybus_number)) {
    alert(`Trolleybus with number ${trolleybus_number} already exists.`);
    return; 
  }
  const generatedId = uuid.v1();

  const newItem = {
    id: generatedId,
    trolleybus_number,
    route_number,
    capacity,
    max_speed,
  };

  trolleybuses.push(newItem);
  addedTrolleybusNumbers.push(trolleybus_number);
  showedList = trolleybuses;

  addItemToPage(newItem);
};

export const addItemToPage = ({
  id,
  trolleybus_number,
  route_number,
  capacity,
  max_speed,
}) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, trolleybus_number, route_number, capacity, max_speed })
  );

  const element = document.getElementById(id);

  // Add an event listener to the "Edit" button for the new item
  const editButton = document.getElementById(`edit-button-${id}`);
  editButton.addEventListener("click", () => handleEditButtonClick(id));
};

const itemTemplate = ({
  id,
  trolleybus_number,
  route_number,
  capacity,
  max_speed,
}) => `
<li id="${id}" class="card mb-3 item-card" draggable="true">
  <img
    src="https://d1c4d7gnm6as1q.cloudfront.net/Pictures/1024x536/0/3/1/28031_ualvivelectrontrolleybuses_422333.jpg"
    class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-title">${route_number}</h5>
    <p class="card-text">Trolleybus number: ${trolleybus_number}</p>
    <p class="card-text">Capacity: ${capacity} people</p>
    <p class="card-text">Max speed: ${max_speed} km/h</p>
  </div>
  <button id="edit-button-${id}" class="btn-primary mb-2 ml-5" style="width: 60px;">Edit</button>
</li>`;

export const clearInputs = () => {
  trolleybusNumberInput.value = "";
  routeNumberInput.value = "";
  capacityInput.value = "";
  maxSpeedInput.value = "";
};

export const getInputValues = () => {
  return {
    trolleybus_number: trolleybusNumberInput.value,
    route_number: routeNumberInput.value,
    capacity: capacityInput.value,
    max_speed: maxSpeedInput.value,
  };
};

submitButton.addEventListener("click", (event) => {
  // Prevents default page reload on submit
  event.preventDefault();

  const { trolleybus_number, route_number, capacity, max_speed } =
    getInputValues();

  clearInputs();

  addItem({
    trolleybus_number,
    route_number,
    capacity,
    max_speed,
  });
});

findButton.addEventListener("click", () => {
  const foundTrolleybuses = trolleybuses.filter(
    (trolleybus) => trolleybus.route_number.search(findInput.value) !== -1
  );
  showedList = foundTrolleybuses 
  renderItemsList(showedList);
});

cancelFindButton.addEventListener("click", () => {
  renderItemsList(trolleybuses);
  showedList = trolleybuses;
  findInput.value = "";
});

sortTrolleybuses.addEventListener("click", () => {
  showedList.sort((first, second) => {
    return second.max_speed - first.max_speed;
  });

  renderItemsList(showedList);
});

calculateButton.addEventListener("click", () => {
  const totalCapacity = showedList.reduce(
    (total, showedList) => Number(total) + Number(showedList.capacity),
    0
  );
  summaryCapacity.textContent = `Summary capacity: ${totalCapacity} people`;
});

export const editItem = (id,trolleybus_number,route_number,capacity,max_speed, newData) => {
  const itemElement = document.getElementById(id);
  if (!itemElement) {
    return;
  }
 
  // Update the item's content with the new data
  const { trolleybus_number1, route_number1, capacity1, max_speed1 } = newData;
  itemElement.innerHTML = `
    <img
      src="https://d1c4d7gnm6as1q.cloudfront.net/Pictures/1024x536/0/3/1/28031_ualvivelectrontrolleybuses_422333.jpg"
      class="item-container__image card-img-top" alt="card">
    <div class="card-body">
      <h5 class="card-title">${route_number1}</h5>
      <p class="card-text">Trolleybus number: ${trolleybus_number1}</p>
      <p class="card-text">Capacity: ${capacity1} people</p>
      <p class="card-text">Max speed: ${max_speed1} km/h</p>
    </div>
    <button id="edit-button-${id}" class="btn-primary mb-2 ml-5" style="width: 60px;">Edit</button>
  `;

  itemsContainer.insertAdjacentHTML("afterbegin", itemElement);

  // Add an event listener to the "Edit" button of the edited item
  const editButton = document.getElementById(`edit-button-${id}`);
  
  editButton.addEventListener("click", () =>{setEditValue(id)
    handleEditButtonClick(id)});

  renderItemsList(trolleybusses);
};

function setEditValue(itemID){
  console.log(itemID)
  for (let i =0; i<trolleybuses.length;i++ ){
    if (itemID === trolleybuses[i].id){
      document.getElementById("edit_route_number_input").value = `${trolleybuses[i].route_number}`;
      document.getElementById("edit_trolleybus_number_input").value = `${trolleybuses[i].trolleybus_number}`;
      document.getElementById("edit_capacity_input").value = `${trolleybuses[i].capacity}`;
      document.getElementById("edit_max_speed_input").value = `${trolleybuses[i].max_speed}`
    }
  }
}
function handleEditButtonClick(itemId) {
  for (let i =0; i<trolleybuses.length;i++ ){
    if (itemId === trolleybuses[i].id){
      document.getElementById("edit_route_number_input").value = `${trolleybuses[i].route_number}`;
      document.getElementById("edit_trolleybus_number_input").value = `${trolleybuses[i].trolleybus_number}`;
      document.getElementById("edit_capacity_input").value = `${trolleybuses[i].capacity}`;
      document.getElementById("edit_max_speed_input").value = `${trolleybuses[i].max_speed}`
    }
  }
  const editForm = document.getElementById("edit_button");
  editForm.addEventListener("click", () => {
    const editedTrolleybus = {
      route_number: document.getElementById("edit_route_number_input").value,
      trolleybus_number: document.getElementById("edit_trolleybus_number_input").value,
      capacity: document.getElementById("edit_capacity_input").value,
      max_speed: document.getElementById("edit_max_speed_input").value,
    };

    const editedTrolleybusIndex = trolleybuses.findIndex((item) => item.id === itemId);

    if (editedTrolleybusIndex !== -1) {
      const trollbusNum = trolleybuses[editedTrolleybusIndex].trolleybus_number;
      trolleybuses[editedTrolleybusIndex] = {
        ...trolleybuses[editedTrolleybusIndex],
        ...editedTrolleybus,
      };

      for (let i = 0; i < addedTrolleybusNumbers.length; i++) {
        if (addedTrolleybusNumbers[i] === trollbusNum) {
          addedTrolleybusNumbers[i] = editedTrolleybus.trolleybus_number;
        }
      }

      alert("Trolleybus edited successfully.");

      renderItemsList(trolleybuses);
    }
  });
}

export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
};
