import { create } from "zustand";
import moment from "moment";
import { toast } from "react-hot-toast";

export interface MemberChild {
  name: string;
  dateOfBirth: string;
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
  yearPayments: number[];
}

export interface MembersState {
  members: Member[];
  formatMember: (member: Member) => Member;
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
    formatMember: (member: Member) => {
      const now = moment();
      member.hasUnderAgeKids = member.children.some(
        (child: MemberChild) => now.diff(child.dateOfBirth, "years") < 18,
      );
      member.longUnpaid = last3Years.every(
        (year: number) => !member.yearPayments.includes(year),
      );
      member.unpaid = !member.yearPayments.includes(now.year());
      member.isRetired =
        member.isRetired || now.diff(member.dateOfBirth, "years") >= 67;
      return member;
    },
    updateMember: async (member: Partial<Member>) => {
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
        yearPayments: [2020, 2021, 2022, 2023, 2024, 2025],
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
        yearPayments: [2019, 2020, 2021, 2022, 2023, 2025],
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
        yearPayments: [2018, 2019, 2020, 2021, 2025],
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
        yearPayments: [2017, 2018, 2019, 2020, 2021, 2022, 2025],
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
        yearPayments: [2021, 2022, 2023],
      },
      {
        id: 6,
        number: 1006,
        idNumber: "99887766E",
        name: "Ana Torres",
        phone: "789 123 456",
        email: "ana.torres@example.com",
        dateOfBirth: "1982-09-09",
        address: "C. de Velázquez 30, 28006 Madrid",
        isRetired: false,
        registeredAt: "2020-05-05",
        children: [{ name: "Luis Torres", dateOfBirth: "2012-04-10" }],
        yearPayments: [2020, 2021, 2022, 2023, 2025],
      },
      {
        id: 7,
        number: 1007,
        idNumber: "33445566F",
        name: "Miguel Sanchez",
        phone: "456 789 123",
        email: "miguel.sanchez@example.com",
        dateOfBirth: "1978-03-25",
        address: "C. de Goya 50, 28001 Madrid",
        isRetired: true,
        registeredAt: "2016-11-30",
        children: [{ name: "Sara Sanchez", dateOfBirth: "2005-07-15" }],
        yearPayments: [2016, 2017, 2018, 2019, 2020, 2021],
      },
      {
        id: 8,
        number: 1008,
        idNumber: "44556677G",
        name: "Elena Ruiz",
        phone: "654 987 321",
        email: "elena.ruiz@example.com",
        dateOfBirth: "1992-06-12",
        address: "C. de Atocha 15, 28012 Madrid",
        isRetired: false,
        registeredAt: "2019-08-25",
        children: [{ name: "David Ruiz", dateOfBirth: "2018-11-05" }],
        yearPayments: [2019, 2020, 2021, 2022, 2023, 2025],
      },
      {
        id: 9,
        number: 1009,
        idNumber: "66778899H",
        name: "Pablo Moreno",
        phone: "321 987 654",
        email: "pablo.moreno@example.com",
        dateOfBirth: "1980-01-10",
        address: "C. de la Princesa 40, 28008 Madrid",
        isRetired: true,
        registeredAt: "2015-04-18",
        children: [{ name: "Lucia Moreno", dateOfBirth: "2003-09-22" }],
        yearPayments: [2015, 2016, 2017, 2018, 2019, 2020, 2025],
      },
      {
        id: 10,
        number: 1010,
        idNumber: "77889900I",
        name: "Isabel Garcia",
        phone: "987 321 654",
        email: "isabel.garcia@example.com",
        dateOfBirth: "1998-04-05",
        address: "C. de Fuencarral 60, 28004 Madrid",
        isRetired: false,
        registeredAt: "2022-02-14",
        children: [],
        yearPayments: [2022, 2023, 2025],
      },
    ],
  };

  set({
    members: store.members.map((member) => store.formatMember(member)),
  });

  console.log(get());

  return store;
});
