import { create } from "zustand";
import moment from "moment";
import { toast } from "react-hot-toast";

export interface MemberChild {
  name: string;
  dateOfBirth: string;
}

export interface Payment {
  date: string;
  year: number;
  amount: number;
}

export interface Member {
  id: number;
  number: number;
  name: string;
  dateOfBirth: string;
  idNumber: string;
  address: string;
  phone: string;
  email: string;
  isRetired: boolean;
  hasUnderAgeKids?: boolean;
  longUnpaid?: boolean;
  unpaid?: boolean;
  registeredAt: string;
  children: MemberChild[];
  payments: Payment[];
}

export interface MembersState {
  members: Member[];
  hasValidationErrorMessage: (member: Partial<Member>) => string;
  formatMember: (member: Member) => Member;
  addMember: (member: Partial<Member>) => Promise<void>;
  updateMember: (member: Partial<Member>) => Promise<void>;
  deleteMember: (member: Partial<Member>) => Promise<void>;
}

export const last3Years = [
  moment().year(),
  moment().subtract("-1 year").year(),
  moment().subtract("-2 year").year(),
];

export const useMembersStore = create<MembersState>((set, get) => {
  const store = {
    hasValidationErrorMessage: (member: Partial<Member>) => {
      const errors: string[] = [];
      const isValidDNIorNIE = (idNumber: string) => {
        const dniRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
        return dniRegex.test(idNumber);
      };
      const isValidPhoneNumber = (phone: string) => {
        const phoneRegex = /^(?:\+34)?[6-9]\d{2}\s?\d{3}\s?\d{3}$/;
        return phoneRegex.test(phone);
      };
      const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      if (!member.number) errors.push("Número de socio es requerido");
      if (!member.name) errors.push("Nombre es requerido");
      if (!member.dateOfBirth) errors.push("Fecha de nacimiento es requerida");
      if (!member.idNumber || !isValidDNIorNIE(member.idNumber))
        errors.push("Número de identificación no es válido");
      if (!member.address) errors.push("Dirección es requerida");
      if (!member.phone || !isValidPhoneNumber(member.phone))
        errors.push("Número de teléfono no es válido");
      if (!member.email || !isValidEmail(member.email))
        errors.push("Correo electrónico no es válido");
      if (!member.registeredAt) errors.push("Fecha de registro es requerida");
      if (member.children) {
        for (const child of member.children) {
          if (!child.name) errors.push("Nombre del hijo es requerido");
          if (!child.dateOfBirth)
            errors.push("Fecha de nacimiento del hijo es requerida");
        }
      }
      if (member.payments) {
        for (const payment of member.payments) {
          if (!payment.date) errors.push("La fecha del pago es requerida");
          if (!payment.amount) errors.push("La cantidad del pago es requerida");
          if (!payment.year) errors.push("El año del pago es requerido");
        }
      }
      return errors.join(", ");
    },
    formatMember: (member: Member) => {
      const now = moment();
      member.hasUnderAgeKids = member.children.some(
        (child: MemberChild) => now.diff(child.dateOfBirth, "years") < 18,
      );
      member.longUnpaid = last3Years.every(
        (year: number) =>
          !member.payments.some((payment) => payment.year === year),
      );
      member.unpaid = !member.payments.some(
        (payment) => payment.year === now.year(),
      );
      member.isRetired =
        member.isRetired || now.diff(member.dateOfBirth, "years") >= 67;
      return member;
    },
    addMember: async (member: Partial<Member>) => {
      const validationError = get().hasValidationErrorMessage(member);
      if (validationError) {
        toast.error("Errores de validación: " + validationError);
        throw new Error(validationError);
      }
      set({
        members: [
          get().formatMember({
            id: Date.now(),
            ...member,
          } as Member),
          ...get().members,
        ],
      });
      toast.success("Socio añadido correctamente!");
    },
    updateMember: async (member: Partial<Member>) => {
      const validationError = get().hasValidationErrorMessage(member);
      if (validationError) {
        toast.error("Errores de validación: " + validationError);
        throw new Error(validationError);
      }
      set({
        members: get().members.map((old) => {
          if (old.id === member.id) {
            return get().formatMember({ ...old, ...member });
          } else {
            return old;
          }
        }),
      });
      toast.success("Socio actualizado correctamente!");
    },
    deleteMember: async (member: Partial<Member>) => {
      if (window.confirm("Estas completamente segur@?")) {
        set({ members: get().members.filter((old) => old.id !== member.id) });
        toast.success("Socio eliminado correctamente!");
      }
    },
    members: [
      {
        id: 1,
        number: 1001,
        idNumber: "45773907H",
        name: "Juan Antonio Betancor Cabrera",
        phone: "666 777 888",
        email: "juanantoniobetancor@gmail.com",
        dateOfBirth: "1987-01-21",
        address: "C. San Borondón 22, 35558 Caleta de Famara, Las Palmas",
        isRetired: false,
        registeredAt: "2020-01-01",
        children: [
          { name: "Josue Betancor Machín", dateOfBirth: "2010-03-16" },
        ],
        payments: [
          { date: "2020-01-15", amount: 100, year: 2020 },
          { date: "2021-01-15", amount: 100, year: 2021 },
          { date: "2022-01-15", amount: 100, year: 2022 },
          { date: "2023-01-15", amount: 100, year: 2023 },
          { date: "2024-01-15", amount: 100, year: 2024 },
          { date: "2025-01-15", amount: 100, year: 2025 },
        ],
      },
      {
        id: 2,
        number: 1002,
        idNumber: "12345678A",
        name: "Maria Lopez",
        phone: "123 456 789",
        email: "maria.lopez@example.com",
        dateOfBirth: "1990-05-15",
        address: "C. Mayor 10, 28013 Madrid",
        isRetired: false,
        registeredAt: "2019-06-01",
        children: [{ name: "Ana Lopez", dateOfBirth: "2015-08-20" }],
        payments: [
          { date: "2019-06-15", amount: 100, year: 2019 },
          { date: "2020-06-15", amount: 100, year: 2020 },
          { date: "2021-06-15", amount: 100, year: 2021 },
          { date: "2022-06-15", amount: 100, year: 2022 },
          { date: "2023-06-15", amount: 100, year: 2023 },
          { date: "2025-06-15", amount: 100, year: 2025 },
        ],
      },
      {
        id: 3,
        number: 1003,
        idNumber: "87654321B",
        name: "Carlos Martinez",
        phone: "987 654 321",
        email: "carlos.martinez@example.com",
        dateOfBirth: "1985-11-30",
        address: "Av. de la Constitución 5, 41001 Sevilla",
        isRetired: true,
        registeredAt: "2018-03-15",
        children: [],
        payments: [
          { date: "2018-03-15", amount: 100, year: 2018 },
          { date: "2019-03-15", amount: 100, year: 2019 },
          { date: "2020-03-15", amount: 100, year: 2020 },
          { date: "2021-03-15", amount: 100, year: 2021 },
          { date: "2025-03-15", amount: 100, year: 2025 },
        ],
      },
      {
        id: 4,
        number: 1004,
        idNumber: "11223344C",
        name: "Laura Fernandez",
        phone: "654 321 987",
        email: "laura.fernandez@example.com",
        dateOfBirth: "1975-07-22",
        address: "C. de Alcalá 45, 28014 Madrid",
        isRetired: true,
        registeredAt: "2017-09-10",
        children: [{ name: "Pedro Fernandez", dateOfBirth: "2000-12-01" }],
        payments: [
          { date: "2017-09-10", amount: 100, year: 2017 },
          { date: "2018-09-10", amount: 100, year: 2018 },
          { date: "2019-09-10", amount: 100, year: 2019 },
          { date: "2020-09-10", amount: 100, year: 2020 },
          { date: "2021-09-10", amount: 100, year: 2021 },
          { date: "2022-09-10", amount: 100, year: 2022 },
          { date: "2025-09-10", amount: 100, year: 2025 },
        ],
      },
      {
        id: 5,
        number: 1005,
        idNumber: "55667788D",
        name: "Javier Gomez",
        phone: "321 654 987",
        email: "javier.gomez@example.com",
        dateOfBirth: "1995-02-18",
        address: "C. de Serrano 25, 28001 Madrid",
        isRetired: false,
        registeredAt: "2021-01-20",
        children: [],
        payments: [
          { date: "2021-01-20", amount: 100, year: 2021 },
          { date: "2022-01-20", amount: 100, year: 2022 },
          { date: "2023-01-20", amount: 100, year: 2023 },
        ],
      },
    ],
  };

  set({
    members: store.members.map((member) => store.formatMember(member)),
  });

  return store;
});
