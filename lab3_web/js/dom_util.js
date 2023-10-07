export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
};
// local functions
const getItemId = (id) => `item-${id}`;

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
