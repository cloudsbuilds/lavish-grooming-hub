import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ---------------------------------- types --------------------------------- */

export type Service = {
  id: string;
  name: string;
  category: "Haircuts" | "Beard" | "Facial" | "Spa Packages";
  description: string;
  duration: string;
  price: number;
};

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string | undefined;
  status: "Pending" | "Confirmed";
  createdAt: string;
};

type Credentials = { username: string; password: string };

const PRICES_KEY = "lavish.prices";
const APPTS_KEY = "lavish.appointments";
const CREDS_KEY = "lavish.credentials";
const SESSION_KEY = "lavish.admin.session";

export const DEFAULT_CREDENTIALS: Credentials = { username: "admin", password: "lavish123" };

export const BASE_SERVICES: Service[] = [
  {
    id: "signature-cut",
    name: "Signature Precision Cut",
    category: "Haircuts",
    description: "Consultation, bespoke scissor cut, hot towel finish and styling.",
    duration: "50 min",
    price: 45,
  },
  {
    id: "skin-fade",
    name: "Skin Fade & Design",
    category: "Haircuts",
    description: "Razor-sharp graduated fade with detailed line-up and edge work.",
    duration: "45 min",
    price: 38,
  },
  {
    id: "father-son",
    name: "Father & Son Duo",
    category: "Haircuts",
    description: "Two classic cuts side by side, with complimentary refreshments.",
    duration: "70 min",
    price: 60,
  },
  {
    id: "beard-sculpt",
    name: "Beard Sculpt & Line",
    category: "Beard",
    description: "Shape, trim and contour with beard oil and balm conditioning.",
    duration: "30 min",
    price: 25,
  },
  {
    id: "royal-shave",
    name: "Royal Straight Razor Shave",
    category: "Beard",
    description: "Steam towels, pre-shave oil, single-blade shave and cold finish.",
    duration: "40 min",
    price: 35,
  },
  {
    id: "moustache",
    name: "Moustache Grooming",
    category: "Beard",
    description: "Precision trim, wax styling and detailing for a defined finish.",
    duration: "20 min",
    price: 15,
  },
  {
    id: "gold-facial",
    name: "24K Gold Radiance Facial",
    category: "Facial",
    description: "Gold-leaf mask, deep cleanse and lymphatic massage for instant glow.",
    duration: "60 min",
    price: 85,
  },
  {
    id: "charcoal-detox",
    name: "Charcoal Detox Treatment",
    category: "Facial",
    description: "Activated charcoal purification for congested and oily skin.",
    duration: "45 min",
    price: 55,
  },
  {
    id: "anti-fatigue",
    name: "Anti-Fatigue Eye Ritual",
    category: "Facial",
    description: "Cooling serums and pressure-point massage to erase tired eyes.",
    duration: "30 min",
    price: 40,
  },
  {
    id: "lavish-ritual",
    name: "The Lavish Ritual",
    category: "Spa Packages",
    description: "Signature cut, royal shave, gold facial and scalp therapy.",
    duration: "2 h 30 min",
    price: 165,
  },
  {
    id: "executive-escape",
    name: "Executive Escape",
    category: "Spa Packages",
    description: "Fade, beard sculpt, express facial and hot stone shoulder massage.",
    duration: "1 h 45 min",
    price: 120,
  },
  {
    id: "groom-package",
    name: "Groom's Grand Package",
    category: "Spa Packages",
    description: "Wedding-day grooming with two trial sessions and full spa day.",
    duration: "3 h",
    price: 240,
  },
];

export const CATEGORIES = ["All", "Haircuts", "Beard", "Facial", "Spa Packages"] as const;

/* --------------------------------- helpers -------------------------------- */

function readJSON<T>(storage: "local" | "session", key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const store = storage === "local" ? window.localStorage : window.sessionStorage;
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(storage: "local" | "session", key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    const store = storage === "local" ? window.localStorage : window.sessionStorage;
    store.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}

const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "seed-1",
    name: "Marcus Rivera",
    phone: "+1 415 220 8891",
    email: "marcus.rivera@mail.com",
    serviceId: "lavish-ritual",
    serviceName: "The Lavish Ritual",
    date: "2026-08-03",
    time: "10:30",
    notes: "Prefers barber Elias.",
    status: "Confirmed",
    createdAt: "2026-07-29T09:12:00.000Z",
  },
  {
    id: "seed-2",
    name: "Dominic Hale",
    phone: "+1 415 771 2043",
    email: "d.hale@mail.com",
    serviceId: "skin-fade",
    serviceName: "Skin Fade & Design",
    date: "2026-08-03",
    time: "14:00",
    status: "Pending",
    createdAt: "2026-07-30T16:40:00.000Z",
  },
  {
    id: "seed-3",
    name: "Ayaan Qureshi",
    phone: "+1 628 004 5512",
    email: "ayaan.q@mail.com",
    serviceId: "gold-facial",
    serviceName: "24K Gold Radiance Facial",
    date: "2026-08-04",
    time: "17:30",
    notes: "Sensitive skin.",
    status: "Pending",
    createdAt: "2026-07-31T11:05:00.000Z",
  },
];

/* --------------------------------- context -------------------------------- */

type SalonContextValue = {
  services: Service[];
  appointments: Appointment[];
  addAppointment: (input: Omit<Appointment, "id" | "status" | "createdAt" | "serviceName">) => void;
  updateStatus: (id: string, status: Appointment["status"]) => void;
  removeAppointment: (id: string) => void;
  updatePrice: (serviceId: string, price: number) => void;
  resetPrices: () => void;
  credentials: Credentials;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (current: string, next: string) => boolean;
};

const SalonContext = createContext<SalonContextValue | null>(null);

export function SalonProvider({ children }: { children: ReactNode }) {
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({});
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);
  const [credentials, setCredentials] = useState<Credentials>(DEFAULT_CREDENTIALS);
  const [isAdmin, setIsAdmin] = useState(false);

  // Hydrate from storage after mount (SSR-safe).
  useEffect(() => {
    setPriceOverrides(readJSON("local", PRICES_KEY, {}));
    setAppointments(readJSON("local", APPTS_KEY, SEED_APPOINTMENTS));
    setCredentials(readJSON("local", CREDS_KEY, DEFAULT_CREDENTIALS));
    setIsAdmin(readJSON("session", SESSION_KEY, false));
  }, []);

  const services = useMemo(
    () => BASE_SERVICES.map((s) => ({ ...s, price: priceOverrides[s.id] ?? s.price })),
    [priceOverrides],
  );

  const addAppointment: SalonContextValue["addAppointment"] = useCallback(
    (input) => {
      const service = BASE_SERVICES.find((s) => s.id === input.serviceId);
      setAppointments((prev) => {
        const next: Appointment[] = [
          {
            ...input,
            id: `apt-${Date.now()}`,
            serviceName: service?.name ?? "Consultation",
            status: "Pending",
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ];
        writeJSON("local", APPTS_KEY, next);
        return next;
      });
    },
    [],
  );

  const updateStatus = useCallback((id: string, status: Appointment["status"]) => {
    setAppointments((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, status } : a));
      writeJSON("local", APPTS_KEY, next);
      return next;
    });
  }, []);

  const removeAppointment = useCallback((id: string) => {
    setAppointments((prev) => {
      const next = prev.filter((a) => a.id !== id);
      writeJSON("local", APPTS_KEY, next);
      return next;
    });
  }, []);

  const updatePrice = useCallback((serviceId: string, price: number) => {
    setPriceOverrides((prev) => {
      const next = { ...prev, [serviceId]: price };
      writeJSON("local", PRICES_KEY, next);
      return next;
    });
  }, []);

  const resetPrices = useCallback(() => {
    setPriceOverrides({});
    writeJSON("local", PRICES_KEY, {});
  }, []);

  const login = useCallback(
    (username: string, password: string) => {
      const matches =
        (username === credentials.username && password === credentials.password) ||
        (username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password);
      if (matches) {
        setIsAdmin(true);
        writeJSON("session", SESSION_KEY, true);
      }
      return matches;
    },
    [credentials],
  );

  const logout = useCallback(() => {
    setIsAdmin(false);
    writeJSON("session", SESSION_KEY, false);
  }, []);

  const changePassword = useCallback(
    (current: string, next: string) => {
      if (current !== credentials.password && current !== DEFAULT_CREDENTIALS.password) return false;
      const updated = { ...credentials, password: next };
      setCredentials(updated);
      writeJSON("local", CREDS_KEY, updated);
      return true;
    },
    [credentials],
  );

  const value: SalonContextValue = {
    services,
    appointments,
    addAppointment,
    updateStatus,
    removeAppointment,
    updatePrice,
    resetPrices,
    credentials,
    isAdmin,
    login,
    logout,
    changePassword,
  };

  return <SalonContext.Provider value={value}>{children}</SalonContext.Provider>;
}

export function useSalon() {
  const ctx = useContext(SalonContext);
  if (!ctx) throw new Error("useSalon must be used inside SalonProvider");
  return ctx;
}
