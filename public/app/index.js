import { io } from 'https://cdn.socket.io/4.8.0/socket.io.esm.min.js';

// For bed request
const bedRequestButton = document.getElementById('bed-request-button');
const bedNoInput = document.getElementById('bed-no');

const bedSocket = io('http://localhost:3000/beds', {
  transports: ['websocket'],
});

// For ward request

const wardRequestButton = document.getElementById('ward-request-button');
const wardNameInput = document.getElementById('ward-name');

const wardSocket = io('http://localhost:3000/wards', {
  transports: ['websocket'],
});

// For department request
const departmentRequestButton = document.getElementById(
  'department-request-button',
);
const departmentNameInput = document.getElementById('department-name');

const departmentSocket = io('http://localhost:3000/departments', {
  transports: ['websocket'],
});

// For bed Socket
bedSocket.on('connect', () => {
  console.log(bedSocket.id);

  bedSocket.on(`bed-no-accepted ${bedSocket.id}`, (bedNo) => {
    console.log(`Accepted ${bedNo}`);
    alert(`Accepted ${bedNo}`);
  });
});

bedRequestButton.onclick = (e) => {
  if (bedSocket.connected) {
    const bedNo = bedNoInput.value;
    bedSocket.emit('request-bed', bedNo);
  } else {
    console.log('not connected');
  }
};

// For ward Socket
wardSocket.on('connect', () => {
  console.log(wardSocket.id);

  wardSocket.on(`ward-name-accepted ${wardSocket.id}`, (wardName) => {
    console.log(`Accepted ${wardName}`);
    alert(`Accepted ${wardName}`);
  });
});

wardRequestButton.onclick = (e) => {
  if (wardSocket.connected) {
    const wardName = wardNameInput.value;
    wardSocket.emit('request-ward', wardName);
  } else {
    console.log('not connected');
  }
};

// For department Socket
departmentSocket.on('connect', () => {
  console.log(departmentSocket.id);

  departmentSocket.on(
    `department-name-accepted ${departmentSocket.id}`,
    (departmentName) => {
      console.log(`Accepted ${departmentName}`);
      alert(`Accepted ${departmentName}`);
    },
  );
});

departmentRequestButton.onclick = (e) => {
  if (departmentSocket.connected) {
    const departmentName = departmentNameInput.value;
    departmentSocket.emit('request-department', departmentName);
  } else {
    console.log('not connected');
  }
};
