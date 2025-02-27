import { create } from "zustand";
import { toast } from "react-hot-toast";

export interface MemberChild {
  id: number;
  name: string;
  dateOfBirth: string;
}

export interface MemberPayment {
  id: number;
  fromDate: string;
  toDate: string;
  createdAt: string;
}

export interface Member {
  id: number;
  name: string;
  dateOfBirth: string;
  idNumber: string;
  address: string;
  phone: string;
  email: string;
  isRetired: boolean;
  registeredAt: string;
  children: MemberChild[];
  payments: MemberPayment[];
  createdAt: string;
  updatedAt: string;
}

export interface MembersState {
  members: Member[];
  createMember: (member: Partial<Member>) => Promise<void>;
  updateMember: (member: Partial<Member>) => Promise<void>;
  deleteMember: (member: Partial<Member>) => Promise<void>;
  addMemberPayment: (member: Member, payment: MemberPayment) => void;
  deleteMemberPayment: (memberPayment: MemberPayment) => void;
}

export const useMembersStore = create<MembersState>((set, get) => ({
  members: [],
  createMember: async (member: Partial<Member>) => {},
  updateMember: async (member: Partial<Member>) => {},
  deleteMember: async (member: Partial<Member>) => {},
  addMemberPayment: async (member: Member, payment: MemberPayment) => {},
  deleteMemberPayment: async (memberPayment: MemberPayment) => {},
}));
