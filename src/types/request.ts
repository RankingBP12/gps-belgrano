import type { Timestamp } from 'firebase/firestore'

export type RequestStatus = 'pending' | 'contacted' | 'closed'

export interface ServiceRequest {
  id: string
  professionalId: string
  clientName: string
  phone: string
  message: string
  status: RequestStatus
  createdAt?: Timestamp
}

export type NewServiceRequest = Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>
