import { useState } from "react"
import { db, auth } from '../firebase'
import { addDoc, collection, deleteDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore/lite"
import { ToastAndroid } from "react-native";



export const useFirestore = () => {

    const [alertas, setAlertas] = useState([])
    const [alertasRojas, setAlertasRojas] = useState([])
    const [alertasNaranjas, setAlertasNaranjas] = useState([])
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

    const getAllAlertasRojas = async () => {
        try {
            setLoading(prev => ({ ...prev, getAllAlertasRojas: true }))
            const querySnapshot = await getDocs(collection(db, "alertasRojas"))
            const dataDB = querySnapshot.docs.map(doc => ({ ...doc.data() }))
            setAlertasRojas(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getAllAlertasRojas: false }))
        }
    }

    const getAllAlertasNaranjas = async () => {
        try {
            setLoading(prev => ({ ...prev, getAllAlertasNaranjas: true }))
            const querySnapshot = await getDocs(collection(db, "alertasNaranjas"))
            const dataDB = querySnapshot.docs.map(doc => ({ ...doc.data() }))
            setAlertasNaranjas(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, getAllAlertasNaranjas: false }))
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

    const addAlerta = async (categoria, tipo) => {
        try {
            setLoading(prev => ({ ...prev, addAlerta: true }))
            const collectionRef = collection(db, "alertas")
            const payload = {
                categoria: categoria,
                userid: auth.currentUser.uid,
                tipo: tipo,
                fecha: now,
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

    const addAlertaRoja = async (lat, long) => {
        try {
            setLoading(prev => ({ ...prev, addAlertaRoja: true }))
            const collectionRef = collection(db, "alertasRojas")
            const payload = {
                latitude: lat,
                longitude: long
            }
            const docRef = await addDoc(collectionRef, payload)
            const id = docRef.id
            const newPayload = ({ ...payload, id })
            setAlertasRojas([newPayload, ...alertasRojas])
            ToastAndroid.show("Alerta creada", ToastAndroid.LONG)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addAlertaRoja: false }))
        }
    }

    const addAlertaNaranja = async (lat, long) => {
        try {
            setLoading(prev => ({ ...prev, addAlertaNaranja: true }))
            const collectionRef = collection(db, "alertasNaranjas")
            const payload = {
                latitude: lat,
                longitude: long
            }
            const docRef = await addDoc(collectionRef, payload)
            const id = docRef.id
            const newPayload = ({ ...payload, id })
            setAlertasNaranjas([newPayload, ...alertasNaranjas])
            ToastAndroid.show("Alerta creada", ToastAndroid.LONG)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addAlertaNaranja: false }))
        }
    }

    return {
        alertas,
        necesidades,
        error,
        loading,
        users,
        alertasRojas,
        alertasNaranjas,
        getAllAlertas,
        getAllNecesidades,
        getAllUsers,
        getAllAlertasNaranjas,
        getAllAlertasRojas,
        addNecesidad,
        addAlerta,
        addAlertaRoja,
        addAlertaNaranja
    }
}