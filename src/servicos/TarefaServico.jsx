import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from '../firebaseConfig';

// const quadroCollectionRef = collection(db, "quadros");
const tarefaCollectionRef = collection(db, "tarefas");

export const getTarefasAPI = async () => {
    const snapshot = await getDocs(tarefaCollectionRef);
    return snapshot.docs.map(doc => ({ codigo: doc.codigo, ...doc.data() }));
};

export const getTarefaPorCodigoAPI = async (codigo) => {
    const tarefaDoc = doc(db, "tarefas", codigo);
    const snapshot = await getDoc(tarefaDoc);
    return { codigo: snapshot.codigo, ...snapshot.data() };
};

const getLastTarefaCodigo = async () => {
    const q = query(tarefaCollectionRef, orderBy("codigo", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data().codigo;
    } else {
        return 0;
    }
};

export const cadastrarTarefaAPI = async (tarefa) => {

    // Criando a referência ao documento do quadro
    const quadroDocRef = doc(db, "quadros", String(tarefa.quadro));

    // Verificando se o quadro existe
    const quadroSnapshot = await getDoc(quadroDocRef);

    if (!quadroSnapshot.exists()) {
        return { status: "error", message: "Quadro não encontrado. Verifique o código do quadro.", objeto: null };
    }

    const quadroData = quadroSnapshot.data();


    const lastCodigo = await getLastTarefaCodigo();
    const newCodigo = lastCodigo + 1;
    const tarefaDocRef = doc(db, "tarefas", String(newCodigo)); // Usando o código como nome do documento
    await setDoc(tarefaDocRef, {
        ...tarefa,
        codigo: newCodigo,
        quadro: quadroDocRef,  // Referência ao documento do quadro
        quadro_nome: quadroData.nome
    });
    return { status: "success", message: "Tarefa cadastrada com sucesso!", objeto: { codigo: newCodigo, ...tarefa, quadro: quadroDocRef, quadro_nome: quadroData.nome } };


};

export const updateTarefaAPI = async (tarefa) => {

    // Criando a referência ao documento do quadro
    const quadroDocRef = doc(db, "quadros", String(tarefa.quadro));
    const quadroData = quadroSnapshot.data();

    // Verificando se o quadro existe
    const quadroSnapshot = await getDoc(quadroDocRef);

    if (!quadroSnapshot.exists()) {
        return { status: "error", message: "Quadro não encontrado. Verifique o código do quadro.", objeto: null };
    }

    try {
        const tarefaDoc = doc(db, "tarefas", String(tarefa.codigo));
        await updateDoc(tarefaDoc, {
            ...tarefa,
            quadro: quadroDocRef,  // Referência ao documento do quadro
            quadro_nome: quadroData.nome
        });
        return { status: "success", message: "Tarefa atualizada com sucesso!", objeto: { ...tarefa, quadro: quadroDocRef, quadro_nome: quadroData.nome } };
    } catch (err) {
        throw err;

    }
};

export const deleteTarefaPorCodigoAPI = async (codigo) => {
    const tarefaDoc = doc(db, "tarefas", String(codigo));
    await deleteDoc(tarefaDoc);
    return { status: "success", message: "Tarefa deletada com sucesso!" };
};
