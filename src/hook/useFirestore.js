import { useState } from "react"
import { db, auth } from '../firebase'
import { addDoc, collection, deleteDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore/lite"
import { ToastAndroid } from "react-native";



export const useFirestore = () => {

    const [alertas, setAlertas] = useState([])
    const [necesidades, setNecesidades] = useState([])
    const [users, setUsers] = useState([])
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
            const querySnapshot = await getDocs(collection(db, "necesidades"))
            const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setNecesidades(dataDB)
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

    const addNecesidad = async (categoria, descripcion) => {
        try {
            setLoading(prev => ({ ...prev, addNecesidad: true }))
            const collectionRef = collection(db, "necesidades")
            const payload = {
                categoria: categoria,
                userid: auth.currentUser.uid,
                fecha: now,
                descripcion: descripcion
            }
            const docRef = await addDoc(collectionRef, payload)
            const id = docRef.id
            const newPayload = ({ ...payload, id })
            setNecesidades([newPayload, ...necesidades])
            ToastAndroid.show("Necesidad creada", ToastAndroid.LONG)
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
            ToastAndroid.show("Alerta creada", ToastAndroid.LONG)
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
        getAllAlertas,
        getAllNecesidades,
        getAllUsers,
        addNecesidad,
        addAlerta,
    }
}