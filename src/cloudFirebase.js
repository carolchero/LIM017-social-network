// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; // conectar ,importar,mostrar

export const db = getFirestore();

// para enviar datos del usuario
export async function dataUser(id, name, email, password, date, cellphone) {
  try {
      console.log("----------------> name:: " + name);
      console.log("----------------> name:: " + email);
      console.log("----------------> name:: " + password);
      console.log("----------------> name:: " + date);
      console.log("----------------> name:: " + cellphone);
    const docRef = await addDoc(collection(db, 'dataUsers'), {
      id, name, email, password, date, cellphone,
    });

    console.log('id data user: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

// para verificar que se agregaron los datos
export async function reviewResult() {
  const querySnapshot = await getDocs(collection(db, 'dataUsers'));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
}
