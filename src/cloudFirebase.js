// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // conectar ,importar,mostrar

export const db = getFirestore();

// para enviar datos del usuario
export function dataUser(name, email, password, date, cellphone) {
  try {
      console.log("----------------> name:: " + name);
      console.log("----------------> name:: " + email);
      console.log("----------------> name:: " + password);
      console.log("----------------> name:: " + date);
      console.log("----------------> name:: " + cellphone);
    const docRef = addDoc(collection(db, 'dataUsers'), {
      nameUSer: name,
      gmail: email,
      passwordUser: password,
      born: date,
      numberCell: cellphone,
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

// para verificar que se agregaron los datos
export function reviewResult() {
  const querySnapshot = getDocs(collection(db, 'dataUsers'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}
