import { io } from 'https://cdn.socket.io/4.8.0/socket.io.esm.min.js';

const checkConnectionButotn = document.getElementById(
  'check-connection-button',
);

// For bed admin
const adminBedSocket = io('http://localhost:3000/beds-admin', {
  transports: ['websocket'],
  query: { token: '123' },
});

// For ward admin
const adminWardSocket = io('http://localhost:3000/wards-admin', {
  transports: ['websocket'],
  query: { token: '123' },
});

// For department admin
const adminDepartmentSocket = io('http://localhost:3000/departments-admin', {
  transports: ['websocket'],
  query: { token: '123' },
});

// For bed admin

adminBedSocket.on('connect', () => {
  console.log(adminBedSocket.id);
});

adminBedSocket.on('disconnect', () => {
  console.log('Socket is disconnected');
});

adminBedSocket.on('incoming-bedprequest', ({ clientId, bedNo }) => {
  const ask = confirm(
    `Do you want to accept ${bedNo} requested by ${clientId}`,
  );

  if (ask) {
    adminBedSocket.emit('accept-bed-no', { clientId, bedNo });
  }
});

// For ward admin
adminWardSocket.on('connect', () => {
  console.log(adminWardSocket.id);
});

adminWardSocket.on('disconnect', () => {
  console.log('Socket is disconnected');
});

adminWardSocket.on('incoming-wardprequest', ({ clientId, wardName }) => {
  const ask = confirm(
    `Do you want to accept ${wardName} requested by ${clientId}`,
  );

  if (ask) {
    adminWardSocket.emit('accept-ward-name', { clientId, wardName });
  }
});

checkConnectionButotn.onclick = (e) => {
  console.log('Socket is connected or not: ', adminBedSocket.connected);
};

// For department admin
adminDepartmentSocket.on(
  'incoming-departmentprequest',
  ({ clientId, departmentName }) => {
    const ask = confirm(
      `Do you want to accept ${departmentName} requested by ${clientId}`,
    );

    if (ask) {
      adminDepartmentSocket.emit('accept-department-name', {
        clientId,
        departmentName,
      });
    }
  },
);

adminDepartmentSocket.on('connect', () => {
  console.log(adminDepartmentSocket.id);
});

adminDepartmentSocket.on('disconnect', () => {
  console.log('Socket is disconnected');
});
