import { useState } from "react"
import { db, auth } from '../firebase'
import { addDoc, collection, getDocs, query, updateDoc, where, doc, increment, arrayRemove, setDoc, getDoc, arrayUnion, onSnapshot } from "firebase/firestore"
import Toast from "react-native-root-toast";



export const useFirestore = () => {

    const [alertas, setAlertas] = useState([])
    const [necesidades, setNecesidades] = useState([])
    const [users, setUsers] = useState([])
    const [alertXuser, setAlertXuser] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})

    var today = new Date();
    var now = today.toLocaleString();

    const getAllAlertas = async () => {
        try {
            setLoading(prev => ({ ...prev, getAllAlertas: true }))
            const querySnapshot = await getDocs(collection(db, "alertas"))
            const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setAlertas(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getAllAlertas: false }))
        }
    }

    const getAllNecesidades = async () => {
        try {
            setLoading(prev => ({ ...prev, getAllNecesidades: true }))
            const dataRef = collection(db, "necesidades")
            onSnapshot(dataRef, (querySnapshot) => {
                const dataDb = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setNecesidades(dataDb)
            })
            // const querySnapshot = await getDocs(collection(db, "necesidades"))
            // const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            // setNecesidades(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getAllNecesidades: false }))
        }
    }

    const getAllUsers = async () => {
        try {
            setLoading(prev => ({ ...prev, getAllUsers: true }))
            const querySnapshot = await getDocs(collection(db, "users"))
            const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setUsers(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getAllUsers: false }))
        }
    }

    const getAlertXuser = async () => {
        try {
            setLoading(prev => ({ ...prev, getAlertXuser: true }))
            const dataRef = collection(db, `alertas`)
            const q = query(dataRef, where("userid", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setAlertXuser(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getAlertXuser: false }))
        }
    }

    const addLikeArray = async (id) => {
        try {
            setLoading(prev => ({ ...prev, addLikeArray: true }))
            const docRef = doc(db, "necesidades", id)
            await updateDoc(docRef, {
                likes: arrayUnion(auth.currentUser.uid),
            }, { merge: true })
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addLikeArray: true }))
        }
    }

    const removeLikeArray = async (id) => {
        try {
            setLoading(prev => ({ ...prev, removeLikeArray: true }))
            const docRef = doc(db, "necesidades", id)
            await updateDoc(docRef, {
                likes: arrayRemove(auth.currentUser.uid)
            })
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, removeLikeArray: true }))
        }
    }

    const updateAddLike = async (id) => {
        try {
            setLoading(prev => ({ ...prev, updateAddLike: true }))
            const dataRef = doc(db, "necesidades", id)
            await updateDoc(dataRef, {
                like: increment(1)
            })
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, updateAddLike: true }))
        }
    }

    const updateSubLike = async (id) => {
        try {
            setLoading(prev => ({ ...prev, updateSubLike: true }))
            const dataRef = doc(db, "necesidades", id)
            await updateDoc(dataRef, {
                like: increment(-1)
            })
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, updateSubLike: true }))
        }
    }

    const addNecesidad = async (categoria, descripcion) => {
        try {
            setLoading(prev => ({ ...prev, addNecesidad: true }))
            const collectionRef = collection(db, "necesidades")
            const payload = {
                categoria: categoria,
                userid: auth.currentUser.uid,
                fecha: now,
                descripcion: descripcion,
                like: 0,
                likes: []
            }
            const docRef = await addDoc(collectionRef, payload)
            const id = docRef.id
            const newPayload = ({ ...payload, id })
            setNecesidades([newPayload, ...necesidades])
            Toast.show("Necesidad creada")
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addNecesidad: false }))
        }
    }

    const addAlerta = async (categoria, tipo, lat, long, nombre) => {
        try {
            setLoading(prev => ({ ...prev, addAlerta: true }))
            const collectionRef = collection(db, "alertas")
            const payload = {
                categoria: categoria,
                tipo: tipo,
                fecha: now,
                latitude: lat,
                longitude: long,
                nombre: nombre,
                userid: auth.currentUser.uid
            }
            const docRef = await addDoc(collectionRef, payload)
            const id = docRef.id
            const newPayload = ({ ...payload, id })
            setAlertas([newPayload, ...alertas])
            Toast.show("Alerta creada")
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addAlerta: false }))
        }
    }

    return {
        alertas,
        necesidades,
        error,
        loading,
        users,
        alertXuser,
        updateAddLike,
        updateSubLike,
        getAllAlertas,
        getAllNecesidades,
        getAllUsers,
        getAlertXuser,
        addNecesidad,
        addAlerta,
        addLikeArray,
        removeLikeArray
    }
}