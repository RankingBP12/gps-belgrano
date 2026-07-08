import { addDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import { requestsRef } from '@/firebase/collections'
import type { NewServiceRequest, ServiceRequest } from '@/types'

/** Crea una solicitud de contacto (formulario del perfil). */
export async function createRequest(data: NewServiceRequest): Promise<string> {
  const ref = await addDoc(requestsRef, {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
  } as never)
  return ref.id
}

/** Todas las solicitudes (para estadísticas del panel). */
export async function getAllRequests(): Promise<ServiceRequest[]> {
  const snap = await getDocs(requestsRef)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}
