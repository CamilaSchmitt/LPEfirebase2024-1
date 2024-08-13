// import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, query, orderBy, limit } from "firebase/firestore";
// import { db } from '../firebaseConfig';

// const quadroCollectionRef = collection(db, "quadros");

// export const getQuadrosAPI = async () => {
//     const snapshot = await getDocs(quadroCollectionRef);
//     return snapshot.docs.map(doc => ({ codigo: doc.codigo, ...doc.data() }));
// };

// export const getQuadroPorCodigoAPI = async (codigo) => {
//     const quadroDoc = doc(db, "quadros", codigo);
//     const snapshot = await getDoc(quadroDoc);
//     return { codigo: snapshot.codigo, ...snapshot.data() };
// };

// const getLastQuadroCodigo = async () => {
//     const q = query(quadroCollectionRef, orderBy("codigo", "desc"), limit(1));
//     const querySnapshot = await getDocs(q);
//     if (!querySnapshot.empty) {
//         return querySnapshot.docs[0].data().codigo;
//     } else {
//         return 0;
//     }
// };

// export const cadastrarQuadroAPI = async (quadro) => {

//     const lastCodigo = await getLastQuadroCodigo();
//     const newCodigo = lastCodigo + 1;
//     const quadroDocRef = doc(db, "quadros", String(newCodigo)); // Usando o código como nome do documento
//     await setDoc(quadroDocRef, {
//         ...quadro,
//         codigo: newCodigo
//     });
//     return { status: "success", message: "Quadro cadastrado com sucesso!", objeto: { codigo: newCodigo, ...quadro } };

// };
// export const updateQuadroAPI = async (quadro) => {
//     try {
//         const quadroDoc = doc(db, "quadros", String(quadro.codigo));
//         await updateDoc(quadroDoc, quadro);
//         return { status: "success", message: "Quadro atualizado com sucesso!", objeto: quadro };
//     } catch (err) {
//         throw err;
//     }
// };

// export const deleteQuadroPorCodigoAPI = async (codigo) => {
//     const quadroDoc = doc(db, "quadros", String(codigo));
//     await deleteDoc(quadroDoc);
//     return { status: "success", message: "Quadro deletado com sucesso!" };
// };

import { auth, db } from '../firebaseConfig';
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where
} from "firebase/firestore";

export const getQuadrosFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'quadros'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                codigo: doc.codigo,
                nome: doc.data().nome,
                autor: doc.data().autor,
            })))
        })
    } catch (err) {
        throw err;
    }
}
export const getQuadrosUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "quadros");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                codigo: doc.codigo,
                nome: doc.data().nome,
                autor: doc.data().autor,
                // uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}
export const deleteQuadroFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'quadros', objeto.codigo)
        await deleteDoc(postDocRef);
    } catch (err) {
        throw err;
    }
}
export const addQuadroFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'quadros'),
            {
                nome: objeto.nome,
                autor: objeto.autor,
            }).then(function (docRef) {
                objeto = { ...objeto, codigo: docRef.codigo };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}
export const updateQuadroFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'quadros', objeto.codigo)
        await updateDoc(postDocRef, {
            nome: objeto.nome,
            autor: objeto.autor,
        })
    } catch (err) {
        throw err;
    }
}